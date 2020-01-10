// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SampleDialog from '../data/Main.json';

export interface InspectorStore {
  project: any;
  dialog: any;
  focusedEvent: string;
  focusedAction: string;
  logs: any[];
}

export const initialStore: InspectorStore = {
  project: SampleDialog,
  dialog: SampleDialog,
  focusedEvent: 'triggers[0]',
  focusedAction: '',
  logs: [],
};
