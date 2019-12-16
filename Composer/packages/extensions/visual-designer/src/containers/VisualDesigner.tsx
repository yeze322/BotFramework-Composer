// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC, useContext, useEffect, useRef } from 'react';
import { MarqueeSelection, Selection } from 'office-ui-fabric-react/lib/MarqueeSelection';

import { KeyboardZone } from '../components/lib/KeyboardZone';
import setFocusState from '../actions/setFocusState';
import { NodeIndexGenerator } from '../utils/NodeIndexGetter';
import { StoreContext } from '../store/StoreContext';
import { StoreState } from '../store/store';
import { NodeEventTypes } from '../components/nodes';
import { KeyboardCommand } from '../constants/KeyboardCommandTypes';
import setDragSelection from '../actions/setDragSelection';

import mapEditorEventToAction from './mapEditorEventToAction';
import mapShortcutToEditorEvent from './mapShortcutToEditorEvent';
import { AdaptiveDialogEditor, AdaptiveDialogEditorProps } from './AdaptiveDialogEditor';
import { VisualDesignerProps } from './VisualDesignerProps';

const mapStateToEditorProps = (state: StoreState): AdaptiveDialogEditorProps => {
  const { dialog, eventPath, focusedId, focusedTab, selectedIds } = state;
  return {
    dialogId: dialog.id,
    dialogData: dialog.json,
    focusedEvent: eventPath,
    focusedAction: focusedId,
    focusedTab,
    selectedIds,
  };
};

/**
 * Fully controlled, event handler wrapper.
 */
export const VisualDesigner: FC<VisualDesignerProps> = (props): JSX.Element | null => {
  const { state: store, dispatch } = useContext(StoreContext);

  /** Editor Event handler */
  const mapEditorEventToHandler = (eventName: NodeEventTypes, eventData?: any) => {
    let handler;
    return handler;
  };

  const handleEditorEvent = (eventName, eventData) => {
    const action = mapEditorEventToAction(eventName, eventData, store);
    if (action) {
      dispatch(action);
      return;
    }

    const eventHandler = mapEditorEventToHandler(eventName);
    if (eventHandler) {
      eventHandler(eventData);
    }
  };

  /** Keyboard Shortcuts */
  let divRef;
  const autoFocus = () => {
    divRef.focus({ preventScroll: true });
  };
  const handleKeyboardCommand = (command: KeyboardCommand) => {
    const editorEvent = mapShortcutToEditorEvent(command, store);
    if (!editorEvent) return;
  };

  /** Drag Selection */
  const nodeIndexGenerator = useRef(new NodeIndexGenerator());
  const nodeItems = nodeIndexGenerator.current.getItemList();
  const selection = new Selection({
    onSelectionChanged: (): void => {
      const selectedIndices = selection.getSelectedIndices();
      const selectedIds = selectedIndices.map(index => nodeItems[index].key as string);

      if (selectedIds.length === 1) {
        dispatch(setFocusState(selectedIds[0]));
      }
      dispatch(setDragSelection(selectedIds));
    },
  });

  useEffect(() => {
    selection.setItems(nodeIndexGenerator.current.getItemList());
  });

  /** Render */
  if (!store.dialog.json) return null;
  return (
    <KeyboardZone onCommand={handleKeyboardCommand}>
      <MarqueeSelection selection={selection} css={{ width: '100%', height: '100%' }}>
        <div
          tabIndex={0}
          className="obi-editor-container"
          data-testid="obi-editor-container"
          css={{
            width: '100%',
            height: '100%',
            padding: '48px 20px',
            boxSizing: 'border-box',
            '&:focus': { outline: 'none' },
          }}
          ref={el => (divRef = el)}
          onClick={e => {
            e.stopPropagation();
            dispatch(setFocusState(''));
          }}
        >
          <AdaptiveDialogEditor
            {...mapStateToEditorProps(store)}
            generateTabIndex={(nodeId: string) => nodeIndexGenerator.current.getNodeIndex(nodeId)}
            onEvent={(eventName, eventData) => {
              autoFocus();
              handleEditorEvent(eventName, eventData);
            }}
          />
        </div>
      </MarqueeSelection>
    </KeyboardZone>
  );
};

VisualDesigner.defaultProps = {
  dialogId: '',
  dialogData: {},
};
