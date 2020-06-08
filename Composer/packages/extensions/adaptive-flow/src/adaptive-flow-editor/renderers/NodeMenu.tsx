// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import formatMessage from 'format-message';

import { MenuTypes } from '../constants/MenuTypes';
import { AttrNames } from '../constants/ElementAttributes';
import { SelectionContext } from '../contexts/SelectionContext';
import { ElementColor } from '../../adaptive-flow-renderer/constants/ElementColors';
import { IconMenu } from '../components/IconMenu';
import { FlowEventHandler } from '../../adaptive-flow-renderer/events/FlowEvent.types';
import { NodeMenuClicked } from '../../adaptive-flow-renderer/events';

export enum NodeMenuKeys {
  DELETE = 'delete',
}

const declareElementAttributes = (id: string) => {
  return {
    [AttrNames.SelectableElement]: true,
    [AttrNames.SelectedId]: `${id}${MenuTypes.NodeMenu}`,
  };
};

interface NodeMenuProps {
  id: string;
  colors: ElementColor;
  onEvent: FlowEventHandler;
}
export const NodeMenu: React.FC<NodeMenuProps> = ({ colors = { color: 'black' }, id, onEvent }) => {
  const menuItems = [
    {
      key: NodeMenuKeys.DELETE,
      name: 'Delete',
      iconProps: {
        iconName: 'Delete',
      },
      onClick: () => onEvent(new NodeMenuClicked(id, NodeMenuKeys.DELETE)),
    },
  ];
  const { selectedIds } = useContext(SelectionContext);
  const nodeSelected = selectedIds.includes(`${id}${MenuTypes.NodeMenu}`);

  return (
    <div
      css={{
        marginRight: '1px',
      }}
      {...declareElementAttributes(id)}
    >
      <IconMenu
        iconName="MoreVertical"
        iconSize={12}
        iconStyles={{
          color: `${colors.color}`,
          selectors: {
            ':focus': {
              outline: 'none',
              selectors: {
                '::after': {
                  outline: '1px solid #0078d4 !important',
                },
              },
            },
          },
        }}
        label={formatMessage('node menu')}
        menuItems={menuItems}
        menuWidth={100}
        nodeSelected={nodeSelected}
      />
    </div>
  );
};
