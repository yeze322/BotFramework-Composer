// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, ComponentClass, useContext } from 'react';
import classnames from 'classnames';

import { EditorContext } from '../../../store/EditorContext';
import { defaultNodeProps, NodeProps } from '../types/nodeProps';

import { eventRendererMap } from './rendererMaps';

function chooseRendererByType($type): FC<NodeProps> | ComponentClass<NodeProps> {
  const renderer = eventRendererMap[$type] || eventRendererMap.default;
  return renderer;
}

const nodeBorderStyle = css`
  outline: 2px solid grey;
`;

export const EventRenderer: FC<NodeProps> = ({ id, data, onEvent, onResize, renderers }): JSX.Element => {
  const ChosenRenderer = chooseRendererByType(data.$type);

  const { focusedId, focusedEvent } = useContext(EditorContext);
  const nodeFocused = focusedId === id || focusedEvent === id;

  return (
    <div
      className={classnames('event-renderer-container', { 'event-renderer-container--focused': nodeFocused })}
      css={css`
        display: inline-block;
        position: relative;
        ${nodeFocused && nodeBorderStyle}
      `}
    >
      <ChosenRenderer
        id={id}
        data={data}
        focused={nodeFocused}
        onEvent={onEvent}
        onResize={size => {
          onResize(size, 'node');
        }}
        renderers={renderers}
      />
    </div>
  );
};

EventRenderer.defaultProps = defaultNodeProps;
