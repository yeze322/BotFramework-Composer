// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SampleDialog from '../data/Main.json';

export interface InspectorStore {
  project: any;
  dialogName: string;
  focusedEvent: string;
  focusedAction: string;
  logs: any[];
}

export const initialStore: InspectorStore = {
  project: {
    todo: SampleDialog,
  },
  dialogName: 'todo',
  focusedEvent: 'triggers[0]',
  focusedAction: '',
  logs: [],
};
