// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, useContext, useCallback } from 'react';
import { generateSDKTitle, PromptTab } from '@bfc/shared';
import { useShellApi } from '@bfc/extension';

import { AttrNames } from '../constants/ElementAttributes';
import { NodeRendererContext } from '../contexts/NodeRendererContext';
import { SelectionContext } from '../contexts/SelectionContext';
import { FlowEventHandler } from '../../adaptive-flow-renderer/events/FlowEvent.types';
import { NodeClicked } from '../../adaptive-flow-renderer/events';

const nodeBorderHoveredStyle = css`
  box-shadow: 0px 0px 0px 1px #323130;
`;

const nodeBorderSelectedStyle = css`
  box-shadow: 0px 0px 0px 2px #0078d4;
`;

// BotAsks, UserAnswers and InvalidPromptBrick nodes selected style
const nodeBorderDoubleSelectedStyle = css`
  box-shadow: 0px 0px 0px 2px #0078d4, 0px 0px 0px 6px rgba(0, 120, 212, 0.3);
`;
export interface NodeWrapperProps {
  id: string;
  tab?: PromptTab;
  data: any;
  onEvent: FlowEventHandler;
}

export const ActionNodeWrapper: FC<NodeWrapperProps> = ({ id, tab, data, onEvent, children }): JSX.Element => {
  const selectableId = tab ? `${id}${tab}` : id;
  const { focusedId, focusedEvent, focusedTab } = useContext(NodeRendererContext);
  const { selectedIds, getNodeIndex } = useContext(SelectionContext);
  const nodeFocused = focusedId === id || focusedEvent === id;
  const nodeDoubleSelected = tab && nodeFocused && tab === focusedTab;
  const nodeSelected = selectedIds.includes(id);

  const declareElementAttributes = (selectedId: string, id: string) => {
    return {
      [AttrNames.NodeElement]: true,
      [AttrNames.FocusableElement]: true,
      [AttrNames.FocusedId]: id,
      [AttrNames.SelectableElement]: true,
      [AttrNames.SelectedId]: selectedId,
      [AttrNames.SelectionIndex]: getNodeIndex(id),
      [AttrNames.Tab]: tab,
    };
  };

  const {
    shellApi: { addCoachMarkRef },
  } = useShellApi();
  const actionRef = useCallback((action) => {
    addCoachMarkRef({ action });
  }, []);

  return (
    <div
      ref={actionRef}
      css={css`
        position: relative;
        border-radius: 2px 2px 0 0;
        ${nodeSelected && nodeBorderSelectedStyle};
        ${nodeFocused && nodeBorderSelectedStyle};
        ${nodeDoubleSelected && nodeBorderDoubleSelectedStyle};
        &:hover {
          ${!nodeFocused && nodeBorderHoveredStyle}
        }
      `}
      {...declareElementAttributes(selectableId, id)}
      aria-label={generateSDKTitle(data, '', tab)}
      onClick={(e) => {
        e.stopPropagation();
        onEvent(new NodeClicked(id, tab));
      }}
    >
      {children}
    </div>
  );
};
