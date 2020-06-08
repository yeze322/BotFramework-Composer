// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from './FlowEvent.types';
export class NodeClicked implements FlowEvent {
  eventType = FlowEventTypes.NodeClicked;
  nodeId: string;
  tabId?: string;
  constructor(nodeId: string, tabId?: string) {
    this.nodeId = nodeId;
    this.tabId = tabId;
  }
}
