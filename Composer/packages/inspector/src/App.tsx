// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import VisualDesigner from '@bfc/visual-designer';

import { reducer } from './reducer';
import { initialStore } from './store';
import { WindowController } from './WindowController';
import { StoreContext } from './store/StoreContext';
import { useStore } from './store/useStore';

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

  const { project, dialogName, focusedEvent, focusedAction } = store;

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <div>
        <WindowController />
        <VisualDesigner
          dialogId={dialogName}
          data={project[dialogName]}
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
