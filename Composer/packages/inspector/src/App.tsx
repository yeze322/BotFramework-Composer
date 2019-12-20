// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import VisualDesigner from '@bfc/visual-designer';

import SampleDialog from './data/Main.json';

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
  const [trigger, setTrigger] = useState('triggers[0]');
  (window as any).setTrigger = trigger => setTrigger(trigger);

  return (
    <div>
      <VisualDesigner
        dialogId={'todo'}
        data={SampleDialog}
        focusedEvent={trigger}
        focusedActions={[]}
        focusedTab={''}
        clipboardActions={[]}
        hosted={false}
        shellApi={mockShellApi}
        onChange={() => null}
      />
    </div>
  );
};
