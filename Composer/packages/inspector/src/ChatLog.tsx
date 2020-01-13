// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import { RuntimeActivity, RuntimeActivityTypes } from './store';

const Bubble = ({ text, color = '#eee' }) => (
  <span style={{ border: `1px solid ${color}`, padding: '10px', display: 'inline-block' }}>{text}</span>
);

const ActivityItem: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  const isUserInput = activity.type === RuntimeActivityTypes.UserInput;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: isUserInput ? 'row-reverse' : 'row' }}>
      <Bubble text={activity.value} />
    </div>
  );
};

export const ChatLog: React.FC<{ logs: RuntimeActivity[] }> = ({ logs }) => {
  return (
    <div style={{ width: '100%' }}>
      {logs.map((activity, index) => (
        <ActivityItem key={`activity[${index}]`} activity={activity} />
      ))}
    </div>
  );
};
