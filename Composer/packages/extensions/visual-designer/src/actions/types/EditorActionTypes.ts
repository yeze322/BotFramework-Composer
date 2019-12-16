// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EditorActionTypes {
  Expand = 'event.view.expand',
  Focus = 'event.view.focus',
  Select = 'event.view.select',
  Navigation = 'event.view.navigation',
  FocusEvent = 'event.view.focus-event',
  CursorMove = 'event.view.cursor-move',
  OpenDialog = 'event.nav.opendialog',
  Delete = 'event.data.delete',
  InsertBefore = 'event.data.insert-before',
  InsertAfter = 'event.data.insert-after',
  Insert = 'event.data.insert',
  InsertEvent = 'event.data.insert-event',
  CopySelection = 'event.data.copy-selection',
  CutSelection = 'event.data.cut-selection',
  DeleteSelection = 'event.data.delete-selection',
  AppendSelection = 'event.data.paste-selection--keyboard',
  InsertSelection = 'event.data.paste-selection--menu',
  Undo = 'event.operation.undo',
  Redo = 'event.operation.redo',
  ReportActionPosition = 'event.coachmark.report-action-position',
}
