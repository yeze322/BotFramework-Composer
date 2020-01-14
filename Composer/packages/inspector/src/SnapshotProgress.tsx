// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Button, Slider } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeActivity } from './store';
import { changeProgress, resetProgress } from './actions/progressActions';
import { RuntimeActivityRenderer, measureActivityListHeight } from './RuntimeActivityLib';

const generateMarkAssets = (logs: RuntimeActivity[]) => {
  const logsCount = logs.length;
  const interval = logsCount > 1 ? Math.floor(100 / (logsCount - 1)) : 0;

  const marks = {};
  const positionByLogIndex = [] as number[];
  const logIndexByPosition = {};

  logs.reduce((position, logItem, logItemIndex) => {
    marks[position] = <RuntimeActivityRenderer activity={logItem} />;
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

  const sliderHeight = measureActivityListHeight(logs);
  return (
    <div
      onMouseDown={stop}
      onDrag={stop}
      onMouseMove={stop}
      onDragStart={stop}
      onDragOver={stop}
      style={{ padding: 10, height: 'calc(100% - 50px)', overflowX: 'hidden', overflowY: 'auto' }}
    >
      <Button onClick={onProgressReset}>Reset</Button>
      {logProgress === undefined ? (
        <Slider
          style={{ height: sliderHeight }}
          vertical
          reverse
          marks={displayedMarks}
          step={1}
          value={currentProgress}
          onChange={onProgressChange}
        />
      ) : (
        <Slider
          style={{ height: sliderHeight }}
          vertical
          reverse
          key={logs.length}
          marks={displayedMarks}
          step={1}
          defaultValue={currentProgress}
          onChange={onProgressChange}
        />
      )}
    </div>
  );
};
