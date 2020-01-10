// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SampleDialog from '../data/Main.json';

export interface InspectorStore {
  /** runtime dialog stack object */
  trace: any;
  /** dialog collections. */
  project: { [dialogName: string]: any };
  dialogPath: string;
  triggerPath: string;
  actionPath: string;
  logs: any[];
}

export const initialStore: InspectorStore = {
  trace: {},
  project: { Main: SampleDialog },
  dialogPath: 'Main',
  triggerPath: 'triggers[0]',
  actionPath: '',
  logs: [],
};
