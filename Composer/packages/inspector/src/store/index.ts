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

export interface Snapshot {
  dialogPath: string;
  triggerPath: string;
  actionPath: string;
  activities: RuntimeActivity[];
}

export interface Project {
  [dialogName: string]: any;
}

export interface InspectorStore {
  /** runtime dialog stack object */
  trace: any;
  /** dialog collections. */
  project: Project;
  logs: RuntimeActivity[];
  logProgress?: number;
}

export const initialStore: InspectorStore = {
  trace: {},
  project: { Main: SampleDialog },
  logs: [],
};
