// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Button, Slider, Tag } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeActivity, RuntimeActivityTypes } from './store';
import { changeProgress, resetProgress } from './actions/progressActions';
import { Colors } from './colors';

const getMarkValue = (activity: RuntimeActivity) => {
  switch (activity.type) {
    case RuntimeActivityTypes.Trigger:
      return <Tag color={Colors.Trigger}>T</Tag>;
    case RuntimeActivityTypes.Action:
      return <Tag color={Colors.Action}>A</Tag>;
    case RuntimeActivityTypes.BotAsks:
      return <Tag color={Colors.Bot}>Bot</Tag>;
    case RuntimeActivityTypes.UserInput:
      return <Tag color={Colors.User}>User</Tag>;
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
  const { displayedMarks, positionByLogIndex, logIndexByPosition } = generateMarkAssets(logs);
  const currentProgress = positionByLogIndex[logProgress ? logProgress - 1 : logs.length - 1];

  const onProgressChange = position => {
    const logIndex = logIndexByPosition[position];
    if (typeof logIndex === 'number') {
      dispatch(changeProgress(logIndex + 1));
    }
  };
  const onProgressReset = () => {
    dispatch(resetProgress());
  };
  return (
    <div
      onMouseDown={stop}
      onDrag={stop}
      onMouseMove={stop}
      onDragStart={stop}
      onDragOver={stop}
      style={{ padding: 10, display: 'inline' }}
    >
      {logProgress === undefined ? (
        <Slider vertical reverse marks={displayedMarks} step={1} value={currentProgress} onChange={onProgressChange} />
      ) : (
        <Slider
          vertical
          reverse
          key={logs.length}
          marks={displayedMarks}
          step={1}
          defaultValue={currentProgress}
          onChange={onProgressChange}
        />
      )}
      <Button onClick={onProgressReset}>Reset</Button>
    </div>
  );
};
