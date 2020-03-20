// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeEventTypes } from '../constants/NodeEventTypes';

class BaseEvent {
  eventType: NodeEventTypes;
  constructor(type: NodeEventTypes) {
    this.eventType = type;
  }
}

export class ExpandTriggerEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.ExpandTrigger);
  }
}

export class FocusTriggerEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.FocusTrigger);
  }
}
export class FocusEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Focus);
  }
}
export class OpenDialogEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.OpenDialog);
  }
}
export class DeleteEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Delete);
  }
}
export class InsertBeforeEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertBefore);
  }
}
export class InsertAfterEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertAfter);
  }
}
export class InsertEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Insert);
  }
}
export class InsertTriggerEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertTrigger);
  }
}
export class CopySelectionEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.CopySelection);
  }
}
export class CutSelectionEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.CutSelection);
  }
}
export class DeleteSelectionEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.DeleteSelection);
  }
}
export class AppendSelectionEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.AppendSelection);
  }
}
export class InsertSelectionEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.InsertSelection);
  }
}
export class UndoEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Undo);
  }
}
export class RedoEvent extends BaseEvent {
  constructor() {
    super(NodeEventTypes.Redo);
  }
}
