// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileInfo } from '@bfc/shared';

import { Path } from '../../utility/path';
import { IFileStorage } from '../storage/interface';
import log from '../../logger';

import { ComposerReservoirSampler } from './sampler/ReservoirSampler';
import { ComposerBootstrapSampler } from './sampler/BootstrapSampler';
import { IConfig } from './interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crossTrainer = require('@microsoft/bf-lu/lib/parser/cross-train/crossTrainer.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const luBuild = require('@microsoft/bf-lu/lib/parser/lubuild/builder.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qnaBuild = require('@microsoft/bf-lu/lib/parser/qnabuild/builder.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LuisBuilder = require('@microsoft/bf-lu/lib/parser/luis/luisBuilder');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const luisToLuContent = require('@microsoft/bf-lu/lib/parser/luis/luConverter');

const GENERATEDFOLDER = 'generated';
const INTERUPTION = 'interuption';

export interface ICrossTrainConfig {
  rootIds: string[];
  triggerRules: { [key: string]: any };
  intentName: string;
  verbose: boolean;
}

export interface IDownSamplingConfig {
  maxImbalanceRatio: number;
  maxUtteranceAllowed: number;
}

export class Builder {
  public botDir: string;
  public dialogsDir: string;
  public generatedFolderPath: string;
  public interruptionFolderPath: string;
  public storage: IFileStorage;
  public config: IConfig | null = null;
  public downSamplingConfig: IDownSamplingConfig = { maxImbalanceRatio: 0, maxUtteranceAllowed: 0 };
  private _locale: string;

  public crossTrainConfig: ICrossTrainConfig = {
    rootIds: [],
    triggerRules: {},
    intentName: '_Interruption',
    verbose: true,
  };

  private luBuilder = new luBuild.Builder((message) => {
    log(message);
  });
  private qnaBuilder = new qnaBuild.Builder((message) => {
    log(message);
  });

  constructor(path: string, storage: IFileStorage, locale: string) {
    this.botDir = path;
    this.dialogsDir = this.botDir;
    this.generatedFolderPath = Path.join(this.dialogsDir, GENERATEDFOLDER);
    this.interruptionFolderPath = Path.join(this.generatedFolderPath, INTERUPTION);
    this.storage = storage;
    this._locale = locale;
  }

  public build = async (luFiles: FileInfo[], qnaFiles: FileInfo[]) => {
    try {
      await this._createGeneratedDir();

      //do cross train before build
      await this._crossTrain(luFiles, qnaFiles);

      await this._runLuBuild(luFiles);
      await this._runQnaBuild(qnaFiles);
      //remove the cross train result
      await this._cleanCrossTrain();
    } catch (error) {
      throw new Error(error.message ?? error.text ?? 'Error building to LUIS.');
    }
  };

  public setBuildConfig(config: IConfig, crossTrainConfig: ICrossTrainConfig, downSamplingConfig: IDownSamplingConfig) {
    this.config = config;
    this.crossTrainConfig = crossTrainConfig;
    this.downSamplingConfig = downSamplingConfig;
  }

  public get locale(): string {
    return this._locale;
  }

  public set locale(v: string) {
    this._locale = v;
  }

  private async _createGeneratedDir() {
    // clear previous folder
    await this._deleteDir(this.generatedFolderPath);
    await this.storage.mkDir(this.generatedFolderPath);
  }

  private _needCrossTrain() {
    return !!this.crossTrainConfig.rootIds.length;
  }

  private async _crossTrain(luFiles: FileInfo[], qnaFiles: FileInfo[]) {
    if (!this._needCrossTrain()) return;
    const luContents = luFiles.map((file) => {
      return { content: file.content, id: file.name };
    });

    const qnaContents = qnaFiles.map((file) => {
      return { content: file.content, id: file.name };
    });
    const result = await crossTrainer.crossTrain(luContents, qnaContents, this.crossTrainConfig);

    await this._writeFiles(result.luResult);
  }

  private _doDownSampling(luObject: any) {
    //do bootstramp sampling to make the utterances' number ratio to 1:10
    const bootstrapSampler = new ComposerBootstrapSampler(
      luObject.utterances,
      this.downSamplingConfig.maxImbalanceRatio
    );
    luObject.utterances = bootstrapSampler.getSampledUtterances();
    //if detect the utterances>15000, use reservoir sampling to down size
    const reservoirSampler = new ComposerReservoirSampler(
      luObject.utterances,
      this.downSamplingConfig.maxUtteranceAllowed
    );
    luObject.utterances = reservoirSampler.getSampledUtterances();
    return luObject;
  }

  private async _downsizeUtterances(luContents: any) {
    return await Promise.all(
      luContents.map(async (luContent) => {
        const result = await LuisBuilder.fromLUAsync(luContent.content);
        const sampledResult = this._doDownSampling(result);
        const content = luisToLuContent(sampledResult);
        return { ...luContent, content };
      })
    );
  }

  private async _writeFiles(crossTrainResult) {
    if (!(await this.storage.exists(this.interruptionFolderPath))) {
      await this.storage.mkDir(this.interruptionFolderPath);
    }
    for (const key of crossTrainResult.keys()) {
      const fileName = Path.basename(key);
      const newFileId = Path.join(this.interruptionFolderPath, fileName);
      await this.storage.writeFile(newFileId, crossTrainResult.get(key).Content);
    }
  }

  private async _runLuBuild(files: FileInfo[]) {
    const config = await this._getConfig(files, 'lu');
    if (config.models.length === 0) {
      throw new Error('No LUIS files exist');
    }

    const loadResult = await this._loadContents(config.models, this.luBuilder);
    loadResult.luContents = await this._downsizeUtterances(loadResult.luContents);
    const authoringEndpoint = config.endpoint ?? `https://${config.region}.api.cognitive.microsoft.com`;

    const buildResult = await this.luBuilder.build(
      loadResult.luContents,
      loadResult.recognizers,
      config.authoringKey,
      authoringEndpoint,
      config.botName,
      config.suffix,
      config.fallbackLocal,
      false,
      loadResult.multiRecognizers,
      loadResult.settings
    );
    await this.luBuilder.writeDialogAssets(buildResult, true, this.generatedFolderPath);
  }

  private async _runQnaBuild(files: FileInfo[]) {
    const config = await this._getConfig(files, 'qna');
    if (config.models.length === 0) {
      throw new Error('No QnA files exist');
    }

    const loadResult = await this._loadContents(config.models, this.qnaBuilder);
    const subscriptKeyEndpoint =
      config.endpoint ?? `https://${config.region}.api.cognitive.microsoft.com/qnamaker/v4.0`;

    const buildResult = await this.qnaBuilder.build(
      loadResult.qnaContents,
      loadResult.recognizers,
      config.subscriptKey,
      subscriptKeyEndpoint,
      config.botName,
      config.suffix,
      config.fallbackLocal,
      false,
      loadResult.multiRecognizers,
      loadResult.settings
    );
    await this.luBuilder.writeDialogAssets(buildResult, true, this.generatedFolderPath);
  }
  //delete files in generated folder
  private async _deleteDir(path: string) {
    if (await this.storage.exists(path)) {
      const files = await this.storage.readDir(path);
      for (const file of files) {
        const curPath = Path.join(path, file);
        if ((await this.storage.stat(curPath)).isDir) {
          await this._deleteDir(curPath);
        } else {
          await this.storage.removeFile(curPath);
        }
      }
      await this.storage.rmDir(path);
    }
  }

  private _getConfig = async (files: FileInfo[], fileSuffix) => {
    if (!this.config) {
      throw new Error('Please complete your LUIS settings');
    }

    const config = {
      authoringKey: this.config.authoringKey || '',
      subscriptKey: this.config.subscriptKey || '',
      region: this.config.authoringRegion || '',
      botName: this.config.name || '',
      suffix: this.config.environment || '',
      fallbackLocal: this.config.defaultLanguage || 'en-us',
      endpoint: this.config.endpoint || null,
      models: [] as string[],
    };

    //add all lu file after cross train
    let paths: string[] = [];
    if (this._needCrossTrain()) {
      paths = await this.storage.glob('**/*.' + fileSuffix, this.interruptionFolderPath);
      config.models = paths.map((filePath) => Path.join(this.interruptionFolderPath, filePath));
    }

    const pathSet = new Set(paths);

    //add the lu file that are not in interruption folder.
    files.forEach((file) => {
      if (!pathSet.has(file.name)) {
        config.models.push(Path.resolve(this.botDir, file.relativePath));
      }
    });
    return config;
  };

  private _loadContents = async (paths: string[], builder: any) => {
    return await builder.loadContents(
      paths,
      this._locale,
      this.config?.environment || '',
      this.config?.authoringRegion || ''
    );
  };

  private async _cleanCrossTrain() {
    if (!this._needCrossTrain()) return;
    await this._deleteDir(this.interruptionFolderPath);
  }
}