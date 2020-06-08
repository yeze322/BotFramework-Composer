// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import {
  NodeMenuComponent,
  EdgeMenuComponent,
  NodeWrapperComponent,
  ElementWrapperComponent,
} from '../adaptive-flow-renderer/types/PluggableComponents.types';
import { RendererContextData } from '../adaptive-flow-renderer/contexts/RendererContext';

import { EditorEventHandler, EditorEventTypes } from './events/EditorEventTypes';
import { NodeMenu, EdgeMenu, ActionNodeWrapper, ElementWrapper } from './renderers';

interface EditorRendererContext {
  onEditorEvent: EditorEventHandler;
}

type FlowRendererGenerator<T> = (context: EditorRendererContext) => T;

const buildFlowEditorNodeMenu: FlowRendererGenerator<NodeMenuComponent> = ({ onEditorEvent }) => ({
  nodeId,
  colors = { color: 'black' },
}) => {
  return <NodeMenu colors={colors} id={nodeId} onEditorEvent={onEditorEvent} />;
};

const buildFlowEditorEdgeMenu: FlowRendererGenerator<EdgeMenuComponent> = ({ onEditorEvent }) => ({
  arrayId,
  arrayPosition,
}) => {
  return (
    <EdgeMenu
      id={`${arrayId}[${arrayPosition}]`}
      onClick={($kind) => onEditorEvent(EditorEventTypes.Insert, { id: arrayId, position: arrayPosition, $kind })}
    />
  );
};

const buildFlowEditorNodeWrapper: FlowRendererGenerator<NodeWrapperComponent> = ({ onEditorEvent }) => ({
  nodeId,
  nodeData,
  nodeTab,
  children,
}) => {
  return (
    <ActionNodeWrapper data={nodeData} id={nodeId} tab={nodeTab as any} onEditorEvent={onEditorEvent}>
      {children}
    </ActionNodeWrapper>
  );
};

const buildFlowEditorElementWrapper: FlowRendererGenerator<ElementWrapperComponent> = () => ElementWrapper;

export const buildRenderers: FlowRendererGenerator<RendererContextData> = (context) => ({
  NodeMenu: buildFlowEditorNodeMenu(context),
  EdgeMenu: buildFlowEditorEdgeMenu(context),
  NodeWrapper: buildFlowEditorNodeWrapper(context),
  ElementWrapper: buildFlowEditorElementWrapper(context),
});
