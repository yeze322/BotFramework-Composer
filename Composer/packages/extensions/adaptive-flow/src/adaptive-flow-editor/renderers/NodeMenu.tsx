// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import formatMessage from 'format-message';

import { EditorEventTypes, EditorEventHandler } from '../events/EditorEventTypes';
import { MenuTypes } from '../constants/MenuTypes';
import { AttrNames } from '../constants/ElementAttributes';
import { SelectionContext } from '../contexts/SelectionContext';
import { ElementColor } from '../../adaptive-flow-renderer/constants/ElementColors';
import { IconMenu } from '../components/IconMenu';

const declareElementAttributes = (id: string) => {
  return {
    [AttrNames.SelectableElement]: true,
    [AttrNames.SelectedId]: `${id}${MenuTypes.NodeMenu}`,
  };
};

interface NodeMenuProps {
  id: string;
  colors: ElementColor;
  onEditorEvent: EditorEventHandler;
}
export const NodeMenu: React.FC<NodeMenuProps> = ({ colors = { color: 'black' }, id, onEditorEvent }) => {
  const menuItems = [
    {
      key: 'delete',
      name: 'Delete',
      iconProps: {
        iconName: 'Delete',
      },
      onClick: () => onEditorEvent(EditorEventTypes.Delete, { id }),
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
