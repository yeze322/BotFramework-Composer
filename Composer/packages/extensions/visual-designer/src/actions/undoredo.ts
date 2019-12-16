// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { EditorAction } from './types/EditorAction';
import { EditorActionTypes } from './types/EditorActionTypes';

export function undo(): EditorAction {
  return {
    type: EditorActionTypes.Undo,
  };
}

export function redo(): EditorAction {
  return {
    type: EditorActionTypes.Redo,
  };
}
