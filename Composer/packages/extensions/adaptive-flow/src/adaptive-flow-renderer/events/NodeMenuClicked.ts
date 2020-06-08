// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from './FlowEvent.types';
export class NodeMenuClicked implements FlowEvent {
  eventType = FlowEventTypes.NodeMenuClicked;
  nodeId: string;
  menuKey: string;
  constructor(nodeId: string, menuKey: string) {
    this.nodeId = nodeId;
    this.menuKey = menuKey;
  }
}
