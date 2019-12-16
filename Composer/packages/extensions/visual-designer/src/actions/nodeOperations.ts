// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { BaseSchema, seedNewDialog } from '@bfc/shared';

import { EditorActionTypes } from './types/EditorActionTypes';

export function insertNode(targetArrayId: string, targetArrayIndex: number, newNode: BaseSchema) {
  return {
    type: EditorActionTypes.Insert,
    payload: {
      targetArrayId,
      targetArrayIndex,
      node: newNode,
    },
  };
}

export const CREATE_NODE = 'VISUAL/CREATE_NODE';
export function createNodeByType(targetArrayId: string, targetArrayIndex: string, $type: string) {
  const node = seedNewDialog($type);
  return {
    type: EditorActionTypes.Insert,
    payload: {
      targetArrayId,
      targetArrayIndex,
      node,
    },
  };
}

export const CREATE_EVENT = 'VISUAL/CREATE_EVENT';
export function createEventByType(targetIndex: string, $type: string) {
  return {
    type: EditorActionTypes.InsertEvent,
    payload: {
      targetIndex,
      $type,
    },
  };
}

export function appendNodes(targetNodeId: string, actions: BaseSchema[]) {
  return {
    type: EditorActionTypes.InsertAfter,
    payload: {
      targetNodeId,
      actions,
    },
  };
}

export function deleteNode(nodeId: string) {
  return {
    type: EditorActionTypes.Delete,
    payload: nodeId,
  };
}

export function deleteNodes(nodeIds: string[]) {
  return {
    type: EditorActionTypes.DeleteSelection,
    payload: nodeIds,
  };
}

export function copyNodes(nodeIds: string[]) {
  return {
    type: EditorActionTypes.CopySelection,
    payload: nodeIds,
  };
}

export function cutNodes(nodeIds: string[]) {
  return {
    type: EditorActionTypes.CutSelection,
    payload: nodeIds,
  };
}

export function pasteNodes(targetArrayId: string, targetArrayIndex: number) {
  return {
    type: EditorActionTypes.InsertSelection,
    payload: {
      targetArrayId,
      targetArrayIndex,
    },
  };
}

export function pasteNodesAfter(targetNodeId: string) {
  return {
    type: EditorActionTypes.InsertSelection,
    payload: {
      targetNodeId,
    },
  };
}
