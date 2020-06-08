// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import {
  NodeMenuComponent,
  EdgeMenuComponent,
  NodeWrapperComponent,
  ElementWrapperComponent,
} from '../adaptive-flow-renderer/types/PluggableComponents.types';

import { EditorEventHandler, EditorEventTypes } from './events/EditorEventTypes';
import { NodeMenu, EdgeMenu, ActionNodeWrapper, ElementWrapper } from './renderers';

type FlowRendererGenerator<T> = (onEditorEvent: EditorEventHandler) => T;

export const buildFlowEditorNodeMenu: FlowRendererGenerator<NodeMenuComponent> = (
  onEditorEvent: EditorEventHandler
) => ({ nodeId, colors = { color: 'black' } }) => {
  return <NodeMenu colors={colors} id={nodeId} onEditorEvent={onEditorEvent} />;
};

export const buildFlowEditorEdgeMenu: FlowRendererGenerator<EdgeMenuComponent> = (
  onEditorEvent: EditorEventHandler
) => ({ arrayId, arrayPosition }) => {
  return (
    <EdgeMenu
      id={`${arrayId}[${arrayPosition}]`}
      onClick={($kind) => onEditorEvent(EditorEventTypes.Insert, { id: arrayId, position: arrayPosition, $kind })}
    />
  );
};

export const buildFlowEditorNodeWrapper: FlowRendererGenerator<NodeWrapperComponent> = (
  onEditorEvent: EditorEventHandler
) => ({ nodeId, nodeData, nodeTab, children }) => {
  return (
    <ActionNodeWrapper data={nodeData} id={nodeId} tab={nodeTab as any} onEditorEvent={onEditorEvent}>
      {children}
    </ActionNodeWrapper>
  );
};

export const buildFlowEditorElementWrapper: FlowRendererGenerator<ElementWrapperComponent> = () => ElementWrapper;
