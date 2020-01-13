// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SampleDialog from '../data/Main.json';

export class RuntimeHistory {
  dialog: string;
  trigger: string;
  actions: string[];
  constructor(dialog: string, trigger: string, actions: string[]) {
    this.dialog = dialog;
    this.trigger = trigger;
    this.actions = [...actions];
  }
}

export interface InspectorStore {
  /** runtime dialog stack object */
  trace: any;
  /** dialog collections. */
  project: { [dialogName: string]: any };
  dialogPath: string;
  triggerPath: string;
  actionPath: string;
  historys: RuntimeHistory[];
  logs: any[];
}

export const initialStore: InspectorStore = {
  trace: {},
  project: { Main: SampleDialog },
  dialogPath: 'Main',
  triggerPath: 'triggers[0]',
  actionPath: '',
  historys: [],
  logs: [],
};
