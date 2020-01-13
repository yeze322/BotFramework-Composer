// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Timeline } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeHistory } from './store';

const RuntimeHistoryCard: React.FC<{ history: RuntimeHistory }> = ({ history }) => {
  return (
    <div>
      <p>
        {history.dialog} / {history.trigger}
      </p>
      {history.actions.map((act, index) => (
        <p key={`${history.dialog}/${history.trigger}[${index}]`}>{act}</p>
      ))}
    </div>
  );
};

export const RuntimeTimeline = () => {
  const { store } = useContext(StoreContext);
  const { historys } = store;
  return (
    <Timeline>
      {historys.map(history => {
        return (
          <Timeline.Item key={`${history.dialog}/${history.trigger}`}>
            <RuntimeHistoryCard history={history} />
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
