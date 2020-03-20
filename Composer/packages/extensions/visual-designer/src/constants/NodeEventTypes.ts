// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum NodeEventTypes {
  ExpandTrigger = 'event.view.expand-trigger',
  FocusTrigger = 'event.view.focus-trigger',
  OpenDialog = 'event.nav.opendialog',
  FocusAction = 'event.view.focus',
  DeleteAction = 'event.data.delete',
  InsertAction = 'event.data.insert',
  InsertActionBefore = 'event.data.insert-before',
  InsertActionAfter = 'event.data.insert-after',
  InsertTrigger = 'event.data.insert-trigger',
  CopySelection = 'event.data.copy-selection',
  CutSelection = 'event.data.cut-selection',
  DeleteSelection = 'event.data.delete-selection',
  AppendSelection = 'event.data.paste-selection--keyboard',
  InsertSelection = 'event.data.paste-selection--menu',
  Undo = 'event.operation.undo',
  Redo = 'event.operation.redo',
}
