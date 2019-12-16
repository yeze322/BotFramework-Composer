// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { EditorActionTypes } from '../actions/types/EditorActionTypes';
import setFocusState from '../actions/setFocusState';
import setEventPath from '../actions/setEventPath';
import setDragSelection from '../actions/setDragSelection';

export default function mapEditorEventToAction(eventName, e, store) {
  switch (eventName) {
    case EditorActionTypes.Focus:
      return setFocusState(e.id, e.type);
    case EditorActionTypes.FocusEvent:
      return setEventPath(e);
    case EditorActionTypes.Select:
      return setDragSelection(e);
  }
  return null;
}
