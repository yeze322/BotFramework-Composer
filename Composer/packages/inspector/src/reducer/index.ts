// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SET_XPATH } from '../actions/setXpath';
import { INIT, APPEND_LOG } from '../actions/messengerActions';
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
      };
    case SET_XPATH:
      return {
        ...store,
        ...payload,
        historys: updateHistoryByXapth(store.historys, payload),
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
