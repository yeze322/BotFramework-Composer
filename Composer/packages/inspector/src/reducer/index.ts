// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SET_XPATH } from '../actions/setXpath';
import { INIT, APPEND_LOG } from '../actions/messengerActions';
import { initialStore, InspectorStore } from '../store';

export const reducer = (store: InspectorStore = initialStore, action): InspectorStore => {
  const { type, payload } = action;
  switch (type) {
    case INIT:
      return {
        ...store,
        ...payload,
        dialogPath: 'Main',
        triggerPath: '',
        actionPath: '',
      };
    case SET_XPATH:
      return {
        ...store,
        ...payload,
      };
    case APPEND_LOG:
      return { ...store, logs: [...store.logs, payload] };
  }
  return store;
};
