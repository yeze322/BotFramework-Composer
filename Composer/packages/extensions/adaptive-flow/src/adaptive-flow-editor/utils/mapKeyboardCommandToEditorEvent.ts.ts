// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyboardPrimaryTypes, KeyboardCommandTypes } from '../constants/KeyboardCommandTypes';
import { EditorEventTypes } from '../events/EditorEventTypes';

export const mapKeyboardCommandToEditorEvent = ({
  area,
  command,
}): { type: EditorEventTypes; payload?: any } | undefined => {
  switch (area) {
    case KeyboardPrimaryTypes.Node:
      switch (command) {
        case KeyboardCommandTypes.Node.Delete:
          return { type: EditorEventTypes.DeleteSelection };
        case KeyboardCommandTypes.Node.Copy:
          return { type: EditorEventTypes.CopySelection };
        case KeyboardCommandTypes.Node.Cut:
          return { type: EditorEventTypes.CutSelection };
        case KeyboardCommandTypes.Node.Paste: {
          return { type: EditorEventTypes.PasteSelection };
        }
      }
      break;
    case KeyboardPrimaryTypes.Cursor: {
      return { type: EditorEventTypes.MoveCursor, payload: { command } };
    }
    case KeyboardPrimaryTypes.Operation: {
      switch (command) {
        case KeyboardCommandTypes.Operation.Undo:
          return { type: EditorEventTypes.Undo, payload: {} };
        case KeyboardCommandTypes.Operation.Redo:
          return { type: EditorEventTypes.Redo, payload: {} };
      }
      break;
    }
    default:
      break;
  }
};
