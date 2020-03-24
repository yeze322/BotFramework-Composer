// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import clonedeep from 'lodash/cloneDeep';

import * as luUtil from '../../utils/luUtil';
import { undoable } from '../middlewares/undo';
import { ActionCreator, State } from '../types';
import luFileStatusStorage from '../../utils/luFileStatusStorage';
import { FileChangeType } from '../middlewares/persistence/types';

import httpClient from './../../utils/httpUtil';
import { ActionTypes } from './../../constants/index';

export const updateLuFile: ActionCreator = async (store, { id, content }) => {
  luFileStatusStorage.updateFile(store.getState().botName, id);
  store.dispatch({
    type: ActionTypes.UPDATE_LU_SUCCESS,
    payload: { id, content, changeType: FileChangeType.UPDATE, name: `${id}.lu` },
  });
};

export const removeLuFile: ActionCreator = async (store, id) => {
  luFileStatusStorage.removeFile(store.getState().botName, id);
  store.dispatch({
    type: ActionTypes.REMOVE_LU_SUCCCESS,
    payload: { id, changeType: FileChangeType.DELETE, name: `${id}.lu` },
  });
};

export const createLuFile: ActionCreator = async (store, { id, content }) => {
  luFileStatusStorage.createFile(store.getState().botName, id);
  store.dispatch({
    type: ActionTypes.CREATE_LU_SUCCCESS,
    payload: { id, content, changeType: FileChangeType.CREATE, name: `${id}.lu` },
  });
};

export const undoableUpdateLuFile = undoable(
  updateLuFile,
  (state: State, args: any[], isEmpty) => {
    if (isEmpty) {
      const id = args[0].id;
      const projectId = args[0].projectId;
      const content = clonedeep(state.luFiles.find(luFile => luFile.id === id)?.content);
      return [{ id, projectId, content }];
    } else {
      return args;
    }
  },
  updateLuFile,
  updateLuFile
);

export const updateLuIntent: ActionCreator = async (store, { projectId, file, intentName, intent }) => {
  const newContent = luUtil.updateIntent(file.content, intentName, intent);
  return await undoableUpdateLuFile(store, { id: file.id, projectId, content: newContent });
};

export const createLuIntent: ActionCreator = async (store, { projectId, file, intent }) => {
  const newContent = luUtil.addIntent(file.content, intent);
  return await undoableUpdateLuFile(store, { id: file.id, projectId, content: newContent });
};

export const removeLuIntent: ActionCreator = async (store, { projectId, file, intentName }) => {
  const newContent = luUtil.removeIntent(file.content, intentName);
  return await undoableUpdateLuFile(store, { id: file.id, projectId, content: newContent });
};

export const publishLuis: ActionCreator = async ({ dispatch, getState }, authoringKey, projectId) => {
  try {
    const response = await httpClient.post(`/projects/${projectId}/luFiles/publish`, { authoringKey, projectId });
    luFileStatusStorage.publishAll(getState().botName);
    dispatch({
      type: ActionTypes.PUBLISH_LU_SUCCCESS,
      payload: { response },
    });
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
