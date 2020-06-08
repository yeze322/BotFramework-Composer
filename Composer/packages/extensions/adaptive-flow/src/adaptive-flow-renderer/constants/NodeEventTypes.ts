// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EditorEventTypes } from '../../adaptive-flow-editor/events/EditorEventTypes';

export enum FlowEventTypes {
  NodeClicked = 'node.clicked',
  NodeDoubleClicked = 'node.double-clicked',
  NodeRightClicked = 'node.right-clicked',
  LinkClicked = 'link.clicked',
}

interface FlowEvent {
  eventType: FlowEventTypes;
}

export class NodeClicked implements FlowEvent {
  eventType = FlowEventTypes.NodeClicked;
  nodeId: string;
  tabId?: string;
  constructor(nodeId: string, tabId?: string) {
    this.nodeId = nodeId;
    this.tabId = tabId;
  }
}

export type FlowEventHandler = (event: FlowEvent) => any;
