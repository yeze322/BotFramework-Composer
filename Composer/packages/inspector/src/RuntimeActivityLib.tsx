// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Tag } from 'antd';

import { RuntimeActivity, RuntimeActivityTypes } from './store';
import { Colors } from './colors';
import { StoreContext } from './store/StoreContext';
import { parseXpath, getDialogNameFromDialogPath } from './reducer/xpathResolver';

const ActivityCoreHeight = 25;
const GroupInterval = 30;
const TriggerBottom = 10;
const OtherLeft = 10;

export const measureActivityHeight = (activity: RuntimeActivity): number => {
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
      return ActivityCoreHeight + TriggerBottom;
    case RuntimeActivityTypes.Action:
      return ActivityCoreHeight;
    case RuntimeActivityTypes.BotAsks:
      return ActivityCoreHeight;
    case RuntimeActivityTypes.UserInput:
      return ActivityCoreHeight;
  }
};

export const measureActivityListHeight = (activities: RuntimeActivity[]): number => {
  const coreHeight = activities.reduce((heightSum, act) => {
    return heightSum + measureActivityHeight(act);
  }, 0);
  const triggerCount = activities.filter(x => x.type === RuntimeActivityTypes.Trigger).length;
  const groupCompensation = Math.max(triggerCount - 1, 0) * GroupInterval;
  return coreHeight + groupCompensation;
};

export const generateActivityListPosition = (activities: RuntimeActivity[]): number[] => {
  const positionList: number[] = [];
  activities.reduce((accHeight, act, currIndex) => {
    positionList.push(accHeight);
    const nextAct = activities[currIndex + 1];
    const bias = nextAct?.type === RuntimeActivityTypes.Trigger ? GroupInterval : 0;
    return accHeight + measureActivityHeight(act) + bias;
  }, 0);
  return positionList;
};

export const TriggerActivity: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const eleHeight = measureActivityHeight(activity);
  const { store } = useContext(StoreContext);
  const { dialogPath, triggerPath } = parseXpath(activity.value);
  const dialogName = getDialogNameFromDialogPath(store.trace, dialogPath);
  return (
    <div style={{ height: eleHeight }}>
      <Tag color={Colors.Dialog}>Dialog</Tag>
      {dialogName}
      {' / '}
      <Tag color={Colors.Trigger}>Trigger</Tag>
      {triggerPath}
    </div>
  );
};

export const ActionActivity: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const eleHeight = measureActivityHeight(activity);
  const { store } = useContext(StoreContext);
  const { actionPath } = parseXpath(activity.value);
  return (
    <div style={{ height: eleHeight, marginLeft: OtherLeft }}>
      <Tag color={Colors.Action}>Action</Tag>
      {actionPath}
    </div>
  );
};

export const RuntimeActivityRenderer: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const eleHeight = measureActivityHeight(activity);
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
      return <TriggerActivity activity={activity} />;
    case RuntimeActivityTypes.Action:
      return <ActionActivity activity={activity} />;
    case RuntimeActivityTypes.BotAsks:
      return (
        <div style={{ height: eleHeight, marginLeft: OtherLeft }}>
          <Tag color={Colors.Bot}>BotResponse</Tag>
          {activity.value}
        </div>
      );
    case RuntimeActivityTypes.UserInput:
      return (
        <div style={{ height: eleHeight, marginLeft: OtherLeft }}>
          <Tag color={Colors.User}>UserInput</Tag>
          {activity.value}
        </div>
      );
  }
};
