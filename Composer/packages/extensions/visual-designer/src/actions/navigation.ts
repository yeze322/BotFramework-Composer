// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { KeyboardCommand } from '../constants/KeyboardCommandTypes';

import { EditorActionTypes } from './types/EditorActionTypes';
import { EditorAction } from './types/EditorAction';

export function navigateToDialog(targetDialogName: string): EditorAction {
  return {
    type: EditorActionTypes.Navigation,
    payload: targetDialogName,
  };
}

export function cursorMove(focusedId: string, command: KeyboardCommand): EditorAction {
  return {
    type: EditorActionTypes.Focus,
    payload: {
      focusedId,
      command,
    },
  };
}
