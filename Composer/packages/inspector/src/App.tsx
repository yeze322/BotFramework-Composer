// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useReducer } from 'react';
import VisualDesigner from '@bfc/visual-designer';

import { reducer } from './reducer';
import { initialStore } from './store';
import { WindowController } from './WindowController';

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
  const [state] = useReducer(reducer, initialStore);

  const { project, dialogName, focusedEvent, focusedAction } = state;

  return (
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
  );
};
