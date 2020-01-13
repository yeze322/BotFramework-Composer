// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, useState } from 'react';
import { Button, Slider } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeActivity, RuntimeActivityTypes } from './store';
import { changeProgress, resetProgress } from './actions/progressActions';

const getMarkValue = (activity: RuntimeActivity) => {
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
      return 'T';
    case RuntimeActivityTypes.Action:
      return 'A';
    case RuntimeActivityTypes.BotAsks:
      return 'B';
    case RuntimeActivityTypes.UserInput:
      return 'U';
    default:
      return activity.value;
  }
};

const generateMarkAssets = (logs: RuntimeActivity[]) => {
  const logsCount = logs.length;
  const interval = logsCount > 1 ? Math.floor(100 / (logsCount - 1)) : 0;

  const marks = {};
  const positionByLogIndex = [] as number[];
  const logIndexByPosition = {};

  logs.reduce((position, logItem, logItemIndex) => {
    marks[position] = getMarkValue(logItem);
    logIndexByPosition[position] = logItemIndex;
    positionByLogIndex[logItemIndex] = position;
    return position + interval;
  }, 0);

  return {
    displayedMarks: marks,
    positionByLogIndex,
    logIndexByPosition,
  };
};

const stop = e => {
  e.preventDefault();
  e.stopPropagation();
};
export const SnapshotProgress = () => {
  const { store, dispatch } = useContext(StoreContext);
  const { logs, logProgress } = store;
  const [localProgress, setLocalProgress] = useState(0);
  const { displayedMarks, positionByLogIndex, logIndexByPosition } = generateMarkAssets(logs);

  const currentProgress = positionByLogIndex[logProgress === undefined ? logs.length - 1 : logProgress];
  const onProgressChange = position => {
    setLocalProgress(position);
    const logIndex = logIndexByPosition[position];
    if (typeof logIndex === 'number') {
      dispatch(changeProgress(logIndex));
    }
  };
  const onProgressReset = () => {
    dispatch(resetProgress());
    setLocalProgress(positionByLogIndex[logs.length - 1]);
  };
  return (
    <div
      onMouseDown={stop}
      onDrag={stop}
      onMouseMove={stop}
      onDragStart={stop}
      onDragOver={stop}
      style={{ padding: 10 }}
    >
      <Slider marks={displayedMarks} step={1} value={localProgress} onChange={onProgressChange} />
      <Button onClick={onProgressReset}>Reset</Button>
    </div>
  );
};
