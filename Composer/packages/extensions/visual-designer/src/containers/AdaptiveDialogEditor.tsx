// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import get from 'lodash/get';

import { EditorContext } from '../store/EditorContext';
import { NodeEventTypes } from '../components/nodes';
import { AdaptiveDialog } from '../adaptive/AdaptiveDialog';
import { Collapse } from '../components/lib/Collapse';
import { AdaptiveEvent } from '../adaptive/AdaptiveEvent';
import { EditorConfig } from '../editorConfig';

export interface AdaptiveDialogEditorProps {
  dialogId: string;
  dialogData: any;
  focusedEvent: string;
  focusedAction: string;
  focusedTab: string;
  selectedIds: string[];
  generateTabIndex?: (nodeId: string) => number;
  onEvent?: (eventName: NodeEventTypes, eventData?: any) => any;
}

const mapPropsToEditorContext = (props: AdaptiveDialogEditorProps) => {
  const { focusedEvent, focusedAction, focusedTab, selectedIds } = props;
  return {
    focusedEvent,
    focusedId: focusedAction,
    focusedTab,
    selectedIds,
  };
};

export const AdaptiveDialogEditor: FC<AdaptiveDialogEditorProps> = (props): JSX.Element => {
  const { dialogId, dialogData } = props;
  const onEvent = props.onEvent || (() => null);

  const FocusedEventDetail = () => {
    const { focusedEvent } = props;
    const focusedEventData = focusedEvent ? get(dialogData, focusedEvent) : null;
    if (focusedEventData) {
      return <AdaptiveEvent path={focusedEvent} data={focusedEventData} dispatchAction={() => null} />;
    }
    return null;
  };

  return (
    <EditorContext.Provider
      value={{
        ...mapPropsToEditorContext(props),
        getNodeIndex: props.generateTabIndex || (() => 0),
      }}
    >
      <div
        css={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={e => {
          e.stopPropagation();
          onEvent(NodeEventTypes.ClickNode, { id: '' });
        }}
      >
        {EditorConfig.features.showEvents ? (
          <AdaptiveDialog path={dialogId} data={dialogData} dispatchAction={() => null} />
        ) : null}
        <div className="editor-interval" style={{ height: 50 }} />
        <Collapse text="Actions">
          <FocusedEventDetail />
        </Collapse>
      </div>
    </EditorContext.Provider>
  );
};

AdaptiveDialogEditor.defaultProps = {
  onEvent: () => null,
};
