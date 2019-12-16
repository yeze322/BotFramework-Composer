// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { BaseSchema } from '@bfc/shared';

import { StepRenderer } from '../components/nodes';
import { EditorActionDispatcher } from '../actions/types/EditorAction';

import mapNodeEventToEditorAction from './mapNodeEventToEditorAction';
import { NodeOperationMenu, CreateAdaptiveJsonMenu } from './adaptiveMenus';

export interface AdaptiveActionProps {
  path: string;
  data: BaseSchema;
  dispatchAction: EditorActionDispatcher;
}

export const AdaptiveAction: FC<AdaptiveActionProps> = ({ path, data, dispatchAction }) => {
  return (
    <StepRenderer
      id={path}
      data={data}
      onEvent={(...params) => {
        const action = mapNodeEventToEditorAction(...params);
        if (action) {
          dispatchAction(action);
        }
      }}
      onResize={() => null}
      renderers={{
        NodeMenu: NodeOperationMenu(dispatchAction),
        EdgeMenu: CreateAdaptiveJsonMenu(dispatchAction),
      }}
    />
  );
};
