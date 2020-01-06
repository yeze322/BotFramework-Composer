// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SET_PROJECT, SET_DIALOG, SET_TRIGGER, SET_ACTION, APPEND_LOG } from '../actions/messengerActions';
import { initialStore, InspectorStore } from '../store';

export const reducer = (store: InspectorStore = initialStore, action): InspectorStore => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT:
      return { ...store, project: payload, dialogName: '', focusedEvent: '', focusedAction: '' };
    case SET_DIALOG:
      return { ...store, dialogName: payload, focusedEvent: '', focusedAction: '' };
    case SET_TRIGGER:
      return { ...store, focusedEvent: payload, focusedAction: '' };
    case SET_ACTION:
      return { ...store, focusedAction: payload };
    case APPEND_LOG:
      return { ...store, logs: [...store.logs, payload] };
  }
  return store;
};
