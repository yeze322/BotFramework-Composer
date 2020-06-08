// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum FlowEventTypes {
  NodeClicked = 'node.clicked',
  NodeDoubleClicked = 'node.double-clicked',
  NodeRightClicked = 'node.right-clicked',
  LinkClicked = 'link.clicked',
}

export interface FlowEvent {
  eventType: FlowEventTypes;
}

export type FlowEventHandler = (event: FlowEvent) => any;
