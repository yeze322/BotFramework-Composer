// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import get from 'lodash/get';

import { SET_PROJECT, SET_TRIGGER, SET_ACTION, APPEND_LOG } from '../actions/messengerActions';
import { initialStore, InspectorStore } from '../store';

export const reducer = (store: InspectorStore = initialStore, action): InspectorStore => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT:
      return {
        ...store,
        project: payload,
        dialog: payload,
        focusedEvent: 'triggers[0]',
        focusedAction: '',
      };
    case SET_TRIGGER:
      return { ...store, ...processTriggerXpath(store.project, payload), focusedAction: '' };
    case SET_ACTION:
      return { ...store, ...processActionXpath(store.project, payload) };
    case APPEND_LOG:
      return { ...store, logs: [...store.logs, payload] };
  }
  return store;
};

const processTriggerXpath = (project, xpath: string) => {
  let dialogPath = '';
  let triggerId = '';

  const trunks = xpath.replace('root.', '').split('.dialog.');
  const last = trunks.splice(trunks.length - 1, 1);
  if (trunks.length) {
    dialogPath = trunks.join('.dialog.') + '.dialog';
  }
  if (last.length) {
    triggerId = last[0];
  }
  return {
    dialog: get(project, dialogPath, project),
    focusedEvent: triggerId,
  };
};

const processActionXpath = (project, xpath: string) => {
  const { dialog, focusedEvent } = processTriggerXpath(project, xpath);
  return {
    dialog,
    focusedEvent: focusedEvent.split('.')[0],
    focusedAction: focusedEvent,
  };
};
