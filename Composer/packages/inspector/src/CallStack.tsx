// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { List, Typography } from 'antd';

import { RuntimeActivity, RuntimeActivityTypes } from './store';
import { TriggerActivity } from './RuntimeActivityLib';

export const CallStack: React.FC<{ logs: RuntimeActivity[] }> = ({ logs }) => {
  const triggerLogs = logs.filter(x => x.type === RuntimeActivityTypes.Trigger);
  return (
    <List
      header={<div>Dialog Begin</div>}
      footer={<div>Most Recent</div>}
      bordered
      dataSource={triggerLogs}
      renderItem={item => (
        <List.Item style={{ padding: '10px 5px' }}>
          <Typography.Text mark>[AT]</Typography.Text>{' '}
          <TriggerActivity styles={{ display: 'inline' }} activity={item} />
        </List.Item>
      )}
    />
  );
};
