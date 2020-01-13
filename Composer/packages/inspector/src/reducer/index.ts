// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SET_XPATH_ACTION, SET_XPATH_TRIGGER } from '../actions/setXpath';
import { INIT, APPEND_LOG, BOT_RESPONSE, USER_INPUT } from '../actions/messengerActions';
import { initialStore, InspectorStore, RuntimeActivity, RuntimeActivityTypes } from '../store';

export const reducer = (store: InspectorStore = initialStore, action): InspectorStore => {
  const { type, payload } = action;
  switch (type) {
    case INIT:
      return {
        ...store,
        ...payload,
        logs: [],
      };
    case SET_XPATH_TRIGGER:
      return {
        ...store,
        logs: [...store.logs, new RuntimeActivity(RuntimeActivityTypes.Trigger, payload)],
      };
    case SET_XPATH_ACTION:
      return {
        ...store,
        logs: [...store.logs, new RuntimeActivity(RuntimeActivityTypes.Action, payload)],
      };
    case BOT_RESPONSE:
      return {
        ...store,
        logs: [...store.logs, new RuntimeActivity(RuntimeActivityTypes.BotAsks, payload.text)],
      };
    case USER_INPUT:
      return {
        ...store,
        logs: [...store.logs, new RuntimeActivity(RuntimeActivityTypes.UserInput, payload.text)],
      };
    case APPEND_LOG:
      return { ...store, logs: [...store.logs, payload] };
  }
  return store;
};
