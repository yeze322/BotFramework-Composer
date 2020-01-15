// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import VisualDesigner from '@bfc/visual-designer';
import get from 'lodash/get';
import 'antd/dist/antd.css';

import './App.css';
import { WindowController } from './WindowController';
import { StoreContext } from './store/StoreContext';
import { useStore } from './store/useStore';
import { SocketController } from './SocketController';
import { BotConnector } from './BotConnector';
import { computeTimelineFromLogs, computeSnapshotFromLogs } from './reducer/timelineHistory';
import { TimelineProgress } from './TimelineProgress';
import { ProjectOverviewContainer } from './ProjectOverview';
import composerIcon from './images/composerIcon.svg';
import { getDialogNameFromDialogPath } from './reducer/xpathResolver';

const mockShellApi = [
  'addCoachMarkRef',
  'navTo',
  'onFocusEvent',
  'onFocusSteps',
  'onSelect',
  'onCopy',
  'saveData',
  'updateLgTemplate',
  'getLgTemplates',
  'copyLgTemplate',
  'removeLgTemplate',
  'removeLgTemplates',
  'undo',
  'redo',
].reduce((acc: any, curr) => {
  acc[curr] = () => null;
  return acc;
}, {});
mockShellApi.getLgTemplates = null;

export const App = () => {
  const { store, dispatch } = useStore();

  const { project, trace, logs, logProgress } = store;
  const historys = useMemo(() => computeTimelineFromLogs(logs), [logs]);
  const snapshot = useMemo(() => computeSnapshotFromLogs(logs, logProgress), [logs, logProgress]);
  const { dialogPath, triggerPath, actionPath, activities } = snapshot;
  const dialogName = getDialogNameFromDialogPath(trace, dialogPath);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <div className="App">
        <WindowController />
        <SocketController />
        <div className="AppHeader">
          <img className="AppHeader__icon" src={composerIcon} />
          <span className="AppHeader__title">Adaptive Dialog Footprint</span>
        </div>
        <div className="AppContent">
          <div className="AppContent__Left">
            <h3>Snapshot - Chatlog</h3>
            <BotConnector />
            <ProjectOverviewContainer />
          </div>
          <div className="AppContent__Middle">
            <h3>Snapshot - Dialog</h3>
            <Breadcrumb>
              <Breadcrumb.Item>{dialogName}</Breadcrumb.Item>
              <Breadcrumb.Item>{triggerPath}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ height: 'calc(100% - 80px)' }}>
              <VisualDesigner
                dialogId={dialogPath}
                data={get(project, dialogName)}
                focusedEvent={triggerPath}
                focusedActions={[actionPath]}
                focusedTab={''}
                clipboardActions={[]}
                hosted={false}
                shellApi={mockShellApi}
                onChange={() => null}
              />
            </div>
          </div>
          <div className="AppContent__Right">
            <h3>Timeline</h3>
            <TimelineProgress />
          </div>
        </div>
        <div className="AppFooter">
          {JSON.stringify({ dialogName, dialogPath, triggerPath, actionPath, historys }, null, '\t')}
        </div>
      </div>
    </StoreContext.Provider>
  );
};
