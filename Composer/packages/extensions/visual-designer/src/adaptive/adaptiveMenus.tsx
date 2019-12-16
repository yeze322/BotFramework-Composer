// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import { NodeMenu } from '../components/menus/NodeMenu';
import { EdgeMenu } from '../components/menus/EdgeMenu';
import { EdgeMenuProps, NodeMenuProps } from '../components/nodes/types/MenuProps';
import { EditorActionDispatcher } from '../actions/types/EditorAction';
import { deleteNode } from '../actions/nodeOperations';
import { insertAdaptiveElementByType } from '../actions/insertAdaptiveElement';

export const NodeOperationMenu = (dispatch: EditorActionDispatcher) => (props: NodeMenuProps) => {
  const { nodeId } = props;
  return (
    <NodeMenu
      id={nodeId}
      onClick={item => {
        if (item === 'delete') {
          dispatch(deleteNode(nodeId));
        }
      }}
    />
  );
};

export const CreateAdaptiveJsonMenu = (dispatch: EditorActionDispatcher) => (props: EdgeMenuProps) => {
  const { nodeArrayPath, nodeArrayIndex } = props;
  return (
    <EdgeMenu
      id={`${nodeArrayPath}[${nodeArrayIndex}]`}
      onClick={$type => {
        dispatch(insertAdaptiveElementByType(nodeArrayPath, nodeArrayIndex, $type));
      }}
    />
  );
};
