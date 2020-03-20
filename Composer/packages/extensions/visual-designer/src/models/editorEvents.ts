// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SDKTypes } from '@bfc/shared';

import { NodeEventTypes } from '../constants/NodeEventTypes';

class BaseEvent {
  eventType: NodeEventTypes;
  constructor(type: NodeEventTypes) {
    this.eventType = type;
  }
}

export class ExpandTrigger extends BaseEvent {
  triggerId: string;
  constructor(triggerId = '') {
    super(NodeEventTypes.ExpandTrigger);
    this.triggerId = triggerId;
  }
}

export class FocusTrigger extends BaseEvent {
  triggerId: string;
  constructor(triggerId = '') {
    super(NodeEventTypes.FocusTrigger);
    this.triggerId = triggerId;
  }
}

export class FocusAction extends BaseEvent {
  actionId: string;
  tabId?: string;
  constructor(actionId: string, tabId?: string) {
    super(NodeEventTypes.FocusAction);
    this.actionId = actionId;
    this.tabId = tabId;
  }
}

export class OpenDialog extends BaseEvent {
  callerActionId: string;
  calleeDialogName: string;
  constructor(callerActionId: string, calleeDialogName: string) {
    super(NodeEventTypes.OpenDialog);
    this.callerActionId = callerActionId;
    this.calleeDialogName = calleeDialogName;
  }
}

export class DeleteAction extends BaseEvent {
  actionId: string;
  constructor(actionId: string) {
    super(NodeEventTypes.DeleteAction);
    this.actionId = actionId;
  }
}

export class InsertAction extends BaseEvent {
  actionType: SDKTypes;
  targetArrayPath: string;
  targetPosition: number;
  constructor(actionType: SDKTypes, targetArrayPath: string, targetPosition: number) {
    super(NodeEventTypes.InsertAction);
    this.actionType = actionType;
    this.targetArrayPath = targetArrayPath;
    this.targetPosition = targetPosition;
  }
}

export class InsertActionBefore extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertActionBefore);
  }
}

export class InsertActionAfter extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertActionAfter);
  }
}

export class InsertTrigger extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertTrigger);
  }
}

export class CopySelection extends BaseEvent {
  constructor() {
    super(NodeEventTypes.CopySelection);
  }
}

export class CutSelection extends BaseEvent {
  constructor() {
    super(NodeEventTypes.CutSelection);
  }
}

export class DeleteSelection extends BaseEvent {
  constructor() {
    super(NodeEventTypes.DeleteSelection);
  }
}

export class AppendSelection extends BaseEvent {
  constructor() {
    super(NodeEventTypes.AppendSelection);
  }
}

export class InsertSelection extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertSelection);
  }
}

export class Undo extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Undo);
  }
}

export class Redo extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Redo);
  }
}
