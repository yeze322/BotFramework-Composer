// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { KeyboardCommandTypes, KeyboardPrimaryTypes, KeyboardCommand } from '../constants/KeyboardCommandTypes';
import { deleteNode, copyNodes, cutNodes, pasteNodesAfter } from '../actions/nodeOperations';
import { StoreState } from '../store/store';
import { EditorAction } from '../actions/types/EditorAction';
import { cursorMove } from '../actions/navigation';
import { undo, redo } from '../actions/undoredo';

export default function mapShortcutToEditorEvent(
  shortcut: KeyboardCommand,
  store: StoreState
): EditorAction | undefined {
  const { area, command } = shortcut;
  switch (area) {
    case KeyboardPrimaryTypes.Node:
      switch (command) {
        case KeyboardCommandTypes.Node.Delete:
          return deleteNode(store.focusedId);
        case KeyboardCommandTypes.Node.Copy:
          return copyNodes(store.selectedIds);
        case KeyboardCommandTypes.Node.Cut:
          return cutNodes(store.selectedIds);
        case KeyboardCommandTypes.Node.Paste:
          return pasteNodesAfter(store.focusedId);
      }
      break;
    case KeyboardPrimaryTypes.Cursor: {
      return cursorMove(store.focusedId, shortcut);
    }
    case KeyboardPrimaryTypes.Operation: {
      switch (command) {
        case KeyboardCommandTypes.Operation.Undo:
          return undo();
        case KeyboardCommandTypes.Operation.Redo:
          return redo();
      }
      break;
    }
    default:
      break;
  }
}
