import { writeFileSync } from 'fs';

import { Request, Response } from 'express';

import { Path } from '../utility/path';
import settings from '../settings/settings.json';
import BotConnectorService from '../services/connector';

// eslint-disable-next-line
const syncConfig = {
  luis: { name: '', environment: '', authoringKey: '', authoringRegion: 'westus', defaultLanguage: 'en-us' },
  MicrosoftAppId: '',
  MicrosoftAppPassword: '',
};

async function updateDrawsomeBot(req: Request, res: Response) {
  const folderPath = Path.resolve(settings.development.defaultFolder);
  const targetPath = `${folderPath}/DrawsomeBot/Main/Main.dialog`;
  writeFileSync(targetPath, JSON.stringify(req.body, null, '\t'));
  await BotConnectorService.sync(syncConfig);
  res.status(200).json({
    path: targetPath,
    synced: true,
    data: req.body,
  });
}

export const DrawsomeController = {
  updateDrawsomeBot,
};
