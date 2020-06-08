// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from './FlowEvent.types';
export class EdgeMenuClicked implements FlowEvent {
  eventType = FlowEventTypes.EdgeMenuClicked;
  arrayPath: string;
  arrayPosition: number;
  menuKey: string;
  constructor(arrayPath: string, arrayPosition: number, menuKey: string) {
    this.arrayPath = arrayPath;
    this.arrayPosition = arrayPosition;
    this.menuKey = menuKey;
  }
}
