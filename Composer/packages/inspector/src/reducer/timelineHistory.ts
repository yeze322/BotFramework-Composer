// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RuntimeActivity, RuntimeHistory, RuntimeActivityTypes, Snapshot } from '../store';
import { parseXpath } from '../actions/setXpath';

export const computeTimelineFromLogs = (logs: RuntimeActivity[]): RuntimeHistory[] => {
  const results = logs.reduce((historys, activity) => {
    switch (activity.type) {
      case RuntimeActivityTypes.Trigger:
      case RuntimeActivityTypes.Action:
        return updateHistoryByXapth(historys, parseXpath(activity.value));
      case RuntimeActivityTypes.BotAsks:
      case RuntimeActivityTypes.UserInput:
        return appendActivityToHistorys(historys, activity);
      default:
        return historys;
    }
  }, [] as RuntimeHistory[]);
  return results;
};

export const computeSnapshotFromLogs = (logs: RuntimeActivity[], logProgress?: number): Snapshot => {
  const rangeLogs = logs.slice(0, logProgress);
  const reverseRangeLogs = [...rangeLogs].reverse();
  const lastSnapshotLog = reverseRangeLogs.find(
    x => x.type === RuntimeActivityTypes.Trigger || x.type === RuntimeActivityTypes.Action
  );
  if (lastSnapshotLog) {
    const paths = parseXpath(lastSnapshotLog.value);
    return {
      ...paths,
      activities: [...rangeLogs],
    };
  }
  return {
    dialogPath: '',
    triggerPath: '',
    actionPath: '',
    activities: [...rangeLogs],
  };
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

const appendActivityToHistorys = (historys: RuntimeHistory[], activity: RuntimeActivity): RuntimeHistory[] => {
  if (!Array.isArray(historys) || historys.length === 0) return historys;
  const historysCopy = [...historys];
  const last = historysCopy.pop() as RuntimeHistory;
  const updatedActions = [...last.actions, activity];
  return [...historysCopy, new RuntimeHistory(last.dialog, last.trigger, updatedActions)];
};
