// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, useState, useMemo, FC } from 'react';
import { Button, Slider } from 'antd';

import { StoreContext } from './store/StoreContext';
import { RuntimeActivity } from './store';
import { changeProgress, resetProgress } from './actions/progressActions';
import { RuntimeActivityRenderer, measureActivityListHeight, generateActivityListPosition } from './RuntimeActivityLib';

const SliderMax = 1000;

const generateMarkAssets = (logs: RuntimeActivity[]) => {
  const TotalHeight = measureActivityListHeight(logs);
  const UnitPerPixel = SliderMax / TotalHeight;

  const jsxList = logs.map((x, index) => <RuntimeActivityRenderer key={`activity[${index}]`} activity={x} />);
  const startHeighList = generateActivityListPosition(logs);
  const markValueList = startHeighList.map(height => height * UnitPerPixel).map(Math.floor);

  const marks = {};
  const logIndexByPosition = {};

  for (let i = 0; i < logs.length; i++) {
    const currMarkValue = markValueList[i];
    const ele = jsxList[i];

    marks[currMarkValue] = ele;
    logIndexByPosition[currMarkValue] = i;
  }

  const findNeareastLogIndexByPosition = (position: number): number => {
    const neareastNext = markValueList.findIndex(x => x > position);
    return Math.min(logs.length - 1, neareastNext - 1);
  };

  return {
    displayedMarks: marks,
    positionByLogIndex: markValueList,
    findNeareastLogIndexByPosition,
  };
};

export const TimelineProgress = () => {
  const { store, dispatch } = useContext(StoreContext);
  const { logs } = store;
  /** Avoid other parts of store changes leading to rerender */
  return <TimelineProgressMemo logs={logs} dispatch={dispatch} />;
};

const TimelineProgressPure: FC<{ logs: RuntimeActivity[]; dispatch }> = ({ logs, dispatch }) => {
  const [sliderPosition, setSliderPosition] = useState(-1);

  const { displayedMarks, positionByLogIndex, findNeareastLogIndexByPosition } = useMemo(
    () => generateMarkAssets(logs),
    [logs]
  );
  const sliderHeight = useMemo(() => measureActivityListHeight(logs), [logs]);

  const onProgressChange = position => {
    setSliderPosition(position);
    const logIndex = findNeareastLogIndexByPosition(position);
    dispatch(changeProgress(logIndex + 1));
  };

  const onProgressReset = () => {
    setSliderPosition(-1);
    dispatch(resetProgress());
  };

  const lastPosition = positionByLogIndex[logs.length - 1];
  const computedSliderPosition = sliderPosition === -1 ? lastPosition : sliderPosition;

  return (
    <div style={{ padding: 10, height: 'calc(100% - 50px)', overflowX: 'hidden', overflowY: 'auto' }}>
      <Button onClick={onProgressReset}>Reset</Button>
      <Slider
        max={SliderMax}
        style={{ height: sliderHeight }}
        vertical
        reverse
        marks={displayedMarks}
        step={1}
        value={computedSliderPosition}
        onChange={onProgressChange}
      />
    </div>
  );
};

const TimelineProgressMemo = React.memo(TimelineProgressPure, (prevProps, nextProps) => {
  const propsEqual = prevProps.logs === nextProps.logs;
  return propsEqual;
});
