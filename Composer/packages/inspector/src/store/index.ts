// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SampleDialog from '../data/Main.json';

export enum RuntimeActivityTypes {
  Trigger = 'trigger',
  Action = 'action',
  BotAsks = 'bot',
  UserInput = 'user',
}

export class RuntimeActivity {
  type: RuntimeActivityTypes;
  value: string;
  constructor(type: RuntimeActivityTypes, value: string) {
    this.type = type;
    this.value = value;
  }
}

export class RuntimeHistory {
  dialog: string;
  trigger: string;
  actions: RuntimeActivity[];
  constructor(dialog: string, trigger: string, actions: RuntimeActivity[]) {
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
  logs: RuntimeActivity[];
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
