// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import VisualDesigner from '@bfc/visual-designer';
import get from 'lodash/get';

import { WindowController } from './WindowController';
import { StoreContext } from './store/StoreContext';
import { useStore } from './store/useStore';
import { SocketController } from './SocketController';
import { BotConnector } from './BotConnector';

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

  const { project, trace, dialogPath, triggerPath, actionPath } = store;
  const dialogName = get(trace, dialogPath + '._id', 'Main');

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <div>
        <BotConnector />
        <WindowController />
        <SocketController />
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
        {JSON.stringify({ dialogName, dialogPath, triggerPath, actionPath }, null, '\t')}
      </div>
    </StoreContext.Provider>
  );
};
