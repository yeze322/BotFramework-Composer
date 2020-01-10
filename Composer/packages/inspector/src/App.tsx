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

  const { dialog, focusedEvent, focusedAction } = store;

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <div>
        <BotConnector />
        <WindowController />
        <SocketController />
        <VisualDesigner
          dialogId={get(dialog, '_id', 'Dialog')}
          data={dialog}
          focusedEvent={focusedEvent}
          focusedActions={[focusedAction]}
          focusedTab={''}
          clipboardActions={[]}
          hosted={false}
          shellApi={mockShellApi}
          onChange={() => null}
        />
      </div>
    </StoreContext.Provider>
  );
};
