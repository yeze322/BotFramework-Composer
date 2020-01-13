// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SET_XPATH } from '../actions/setXpath';
import { INIT, APPEND_LOG, BOT_RESPONSE, USER_INPUT } from '../actions/messengerActions';
import { initialStore, InspectorStore, RuntimeHistory, RuntimeActivity, RuntimeActivityTypes } from '../store';

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
        historys: [],
        logs: [],
      };
    case SET_XPATH:
      return {
        ...store,
        ...payload,
        historys: updateHistoryByXapth(store.historys, payload),
      };
    case BOT_RESPONSE:
      return {
        ...store,
        historys: appendBotResponseToHistorys(store.historys, payload),
      };
    case USER_INPUT:
      return {
        ...store,
        historys: appendUserInputToHistorys(store.historys, payload),
      };
    case APPEND_LOG:
      return { ...store, logs: [...store.logs, payload] };
  }
  return store;
};

const updateHistoryByXapth = (
  historys: RuntimeHistory[],
  input: { dialogPath: string; triggerPath: string; actionPath: string }
): RuntimeHistory[] => {
  const { dialogPath, triggerPath, actionPath } = input;
  if (!Array.isArray(historys) || !historys.length) {
    return [
      new RuntimeHistory(
        dialogPath,
        triggerPath,
        actionPath ? [new RuntimeActivity(RuntimeActivityTypes.Action, actionPath)] : []
      ),
    ];
  }

  const copyHistorys = [...historys];
  const last = copyHistorys.pop();
  if (last?.dialog === dialogPath && last.trigger === triggerPath) {
    return [
      ...copyHistorys,
      new RuntimeHistory(
        dialogPath,
        triggerPath,
        actionPath ? [...last.actions, new RuntimeActivity(RuntimeActivityTypes.Action, actionPath)] : [...last.actions]
      ),
    ];
  } else {
    return [
      ...historys,
      new RuntimeHistory(
        dialogPath,
        triggerPath,
        actionPath ? [new RuntimeActivity(RuntimeActivityTypes.Action, actionPath)] : []
      ),
    ];
  }
};

const appendBotResponseToHistorys = (historys: RuntimeHistory[], message): RuntimeHistory[] => {
  const activity = new RuntimeActivity(RuntimeActivityTypes.BotAsks, message.text);
  return appendActivityToHistorys(historys, activity);
};

const appendUserInputToHistorys = (historys: RuntimeHistory[], message): RuntimeHistory[] => {
  const activity = new RuntimeActivity(RuntimeActivityTypes.UserInput, message.text);
  return appendActivityToHistorys(historys, activity);
};

const appendActivityToHistorys = (historys: RuntimeHistory[], activity: RuntimeActivity): RuntimeHistory[] => {
  if (!Array.isArray(historys) || historys.length === 0) return historys;
  const historysCopy = [...historys];
  const last = historysCopy.pop() as RuntimeHistory;
  const updatedActions = [...last.actions, activity];
  return [...historysCopy, new RuntimeHistory(last.dialog, last.trigger, updatedActions)];
};
