// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum NodeEventTypes {
  ExpandTrigger = 'event.view.expand-trigger',
  FocusTrigger = 'event.view.focus-trigger',
  Focus = 'event.view.focus',
  OpenDialog = 'event.nav.opendialog',
  Delete = 'event.data.delete',
  InsertBefore = 'event.data.insert-before',
  InsertAfter = 'event.data.insert-after',
  Insert = 'event.data.insert',
  InsertTrigger = 'event.data.insert-trigger',
  CopySelection = 'event.data.copy-selection',
  CutSelection = 'event.data.cut-selection',
  DeleteSelection = 'event.data.delete-selection',
  AppendSelection = 'event.data.paste-selection--keyboard',
  InsertSelection = 'event.data.paste-selection--menu',
  Undo = 'event.operation.undo',
  Redo = 'event.operation.redo',
}
