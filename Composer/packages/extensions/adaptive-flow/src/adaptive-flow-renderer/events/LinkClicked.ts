// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from './FlowEvent.types';

export class DialogLinkClicked implements FlowEvent {
  eventType = FlowEventTypes.DialogLinkClicked;
  nodeId: string;
  calleeDialog: string;
  constructor(nodeId: string, calleeDialog: any) {
    this.nodeId = nodeId;
    this.calleeDialog = calleeDialog;
  }
}
