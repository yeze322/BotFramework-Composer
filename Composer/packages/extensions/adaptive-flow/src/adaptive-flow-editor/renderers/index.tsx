// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import {
  NodeMenuComponent,
  EdgeMenuComponent,
  NodeWrapperComponent,
  ElementWrapperComponent,
} from '../../adaptive-flow-renderer/types/PluggableComponents.types';
import { EdgeMenuClicked } from '../../adaptive-flow-renderer/events';

import { NodeMenu } from './NodeMenu';
import { EdgeMenu } from './EdgeMenu';
import { ActionNodeWrapper } from './NodeWrapper';
import { ElementWrapper } from './ElementWrapper';

export const FlowEditorNodeMenu: NodeMenuComponent = ({ nodeId, colors = { color: 'black' }, onEvent }) => {
  return <NodeMenu colors={colors} id={nodeId} onEvent={onEvent} />;
};

export const FlowEditorEdgeMenu: EdgeMenuComponent = ({ arrayId, arrayPosition, onEvent }) => {
  return (
    <EdgeMenu
      id={`${arrayId}[${arrayPosition}]`}
      onClick={($kind) => onEvent(new EdgeMenuClicked(arrayId, arrayPosition, $kind as string))}
    />
  );
};

export const FlowEditorNodeWrapper: NodeWrapperComponent = ({ nodeId, nodeData, nodeTab, onEvent, children }) => {
  return (
    <ActionNodeWrapper data={nodeData} id={nodeId} tab={nodeTab as any} onEvent={onEvent}>
      {children}
    </ActionNodeWrapper>
  );
};

export const FlowEditorElementWrapper: ElementWrapperComponent = ElementWrapper;
