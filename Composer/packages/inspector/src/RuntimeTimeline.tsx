// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Timeline } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeHistory, RuntimeActivity } from './store';

const RuntimeActivityRenderer: React.FC<{ activity: RuntimeActivity }> = ({ activity }) => {
  return <p>{activity.value}</p>;
};

const RuntimeTriggerItem: React.FC<{ history: RuntimeHistory }> = ({ history }) => {
  return (
    <p>
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
