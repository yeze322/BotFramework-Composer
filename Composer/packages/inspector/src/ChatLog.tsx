// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import { Switch } from 'antd';

import { RuntimeActivity, RuntimeActivityTypes } from './store';

const Bubble = ({ text, color = '#eee' }) => (
  <span style={{ border: `1px solid ${color}`, padding: '10px', display: 'inline-block' }}>{text}</span>
);

const ActivityItem: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const isUserInput = activity.type === RuntimeActivityTypes.UserInput;
  let content: JSX.Element;
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
    case RuntimeActivityTypes.Action:
      content = <>{activity.value}</>;
      break;
    case RuntimeActivityTypes.BotAsks:
    case RuntimeActivityTypes.UserInput:
      content = <Bubble text={activity.value} />;
      break;
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: isUserInput ? 'row-reverse' : 'row' }}>{content}</div>
  );
};

export const ChatLog: React.FC<{ logs: RuntimeActivity[] }> = ({ logs }) => {
  const [showVerbose, setShowVerbose] = useState(false);
  const filteredLogs = showVerbose
    ? logs
    : logs.filter(x => x.type === RuntimeActivityTypes.BotAsks || x.type === RuntimeActivityTypes.UserInput);
  return (
    <div style={{ width: '100%' }}>
      <Switch
        checkedChildren={'verbose'}
        unCheckedChildren={'only I/O'}
        checked={showVerbose}
        onChange={setShowVerbose}
      />
      {filteredLogs.map((activity, index) => (
        <ActivityItem key={`activity[${index}]`} activity={activity} />
      ))}
    </div>
  );
};
