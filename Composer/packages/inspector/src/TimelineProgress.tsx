// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';
import { Button, Slider } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeActivity } from './store';
import { changeProgress, resetProgress } from './actions/progressActions';
import { RuntimeActivityRenderer, measureActivityListHeight, generateActivityListPosition } from './RuntimeActivityLib';

const generateMarkAssets = (logs: RuntimeActivity[]) => {
  const TotalHeight = measureActivityListHeight(logs);
  const UnitPerPixel = 100 / TotalHeight;

  const jsxList = logs.map(x => <RuntimeActivityRenderer activity={x} />);
  const startHeighList = generateActivityListPosition(logs);
  const markValueList = startHeighList.map(height => height * UnitPerPixel);

  const marks = {};
  const logIndexByPosition = {};

  for (let i = 0; i < logs.length; i++) {
    const currMarkValue = markValueList[i];
    const ele = jsxList[i];

    marks[currMarkValue] = ele;
    logIndexByPosition[currMarkValue] = i;
  }

  return {
    displayedMarks: marks,
    positionByLogIndex: markValueList,
    logIndexByPosition,
  };
};

export const TimelineProgress = () => {
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
    <div style={{ padding: 10, height: 'calc(100% - 50px)', overflowX: 'hidden', overflowY: 'auto' }}>
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
