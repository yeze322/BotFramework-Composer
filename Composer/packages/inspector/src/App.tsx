// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import VisualDesigner from '@bfc/visual-designer';
import get from 'lodash/get';
import 'antd/dist/antd.css';

import './App.css';
import { WindowController } from './WindowController';
import { StoreContext } from './store/StoreContext';
import { useStore } from './store/useStore';
import { SocketController } from './SocketController';
import { BotConnector } from './BotConnector';
import { RuntimeTimeline } from './RuntimeTimeline';

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

  const { project, trace, dialogPath, triggerPath, actionPath, historys } = store;
  const dialogName = get(trace, dialogPath + '._id', 'Main');

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <div className="App">
        <div className="AppHeader">
          <BotConnector />
          <WindowController />
          <SocketController />
        </div>
        <div className="AppContent">
          <div className="AppContent__Left">
            <RuntimeTimeline />
          </div>
          <div className="AppContent__Middle">
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
          <div className="AppContent__Right">chat</div>
        </div>
        <div className="AppFooter">
          {JSON.stringify({ dialogName, dialogPath, triggerPath, actionPath, historys }, null, '\t')}
        </div>
      </div>
    </StoreContext.Provider>
  );
};
