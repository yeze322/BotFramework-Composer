// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { FC } from 'react';
import { Timeline, Tag } from 'antd';

import { RuntimeHistory, RuntimeActivity, RuntimeActivityTypes } from './store';
import { Colors } from './colors';

const RuntimeActivityRenderer: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  let tagText = '',
    tagColor = 'blue';
  switch (activity.type) {
    case RuntimeActivityTypes.Action:
      tagText = 'Action';
      tagColor = Colors.Action;
      break;
    case RuntimeActivityTypes.BotAsks:
      tagText = 'BotResponse';
      tagColor = Colors.Bot;
      break;
    case RuntimeActivityTypes.UserInput:
      tagText = 'UserInput';
      tagColor = Colors.User;
      break;
  }
  return (
    <p>
      <Tag color={tagColor}>{tagText}</Tag>
      {activity.value}
    </p>
  );
};

const RuntimeTriggerItem: React.FC<{ history: RuntimeHistory }> = ({ history }) => {
  return (
    <p>
      <Tag color={Colors.Trigger}>Trigger</Tag>
      {history.dialog} / {history.trigger}
    </p>
  );
};

const RuntimeHistoryCard: React.FC<{ history: RuntimeHistory }> = ({ history }) => {
  return (
    <div>
      {<RuntimeTriggerItem history={history} />}
      {history.actions.map((act, index) => (
        <RuntimeActivityRenderer key={`${history.dialog}/${history.trigger}[${index}]`} activity={act} />
      ))}
    </div>
  );
};

export const RuntimeTimeline: FC<{ historys: RuntimeHistory[] }> = ({ historys }) => {
  return (
    <Timeline>
      {historys.map((history, index) => {
        return (
          <Timeline.Item key={`history[${index}]`}>
            <RuntimeHistoryCard history={history} />
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
