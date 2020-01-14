// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { Tag } from 'antd';

import { RuntimeActivity, RuntimeActivityTypes } from './store';
import { Colors } from './colors';

const ActivityCoreHeight = 25;
const GroupInterval = 20;
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

export const RuntimeActivityRenderer: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const eleHeight = measureActivityHeight(activity);
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
      return (
        <div style={{ height: eleHeight }}>
          <Tag color={Colors.Trigger}>Trigger</Tag>
          {activity.value}
        </div>
      );
    case RuntimeActivityTypes.Action:
      return (
        <div style={{ height: eleHeight, marginLeft: OtherLeft }}>
          <Tag color={Colors.Action}>Action</Tag>
          {activity.value}
        </div>
      );
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
