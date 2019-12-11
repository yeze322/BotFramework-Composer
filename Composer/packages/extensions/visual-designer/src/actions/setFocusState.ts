// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { EditorActionTypes } from './types/EditorActionTypes';
import { EditorAction } from './types/EditorAction';

export default function setFocusState(focusedId: string, focusedTab?: string): EditorAction {
  return {
    type: EditorActionTypes.Focus,
    payload: {
      focusedId,
      focusedTab,
    },
  };
}
