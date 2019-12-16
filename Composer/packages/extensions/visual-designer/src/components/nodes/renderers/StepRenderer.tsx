// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';

import { NodeProps, defaultNodeProps } from '../types/nodeProps';

import { actionRendererMap } from './rendererMaps';

const chooseRendererByType = ($type: string) => {
  return actionRendererMap[$type] || actionRendererMap.default;
};

export const StepRenderer: FC<NodeProps> = ({ id, data, onEvent, onResize, renderers }): JSX.Element => {
  const ChosenRenderer = chooseRendererByType(data.$type);

  return (
    <ChosenRenderer
      id={id}
      data={data}
      onEvent={onEvent}
      onResize={size => {
        onResize(size, 'node');
      }}
      renderers={renderers}
    />
  );
};

StepRenderer.defaultProps = defaultNodeProps;
