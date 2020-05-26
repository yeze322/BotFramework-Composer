// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useState } from 'react';
import classnames from 'classnames';
import formatMessage from 'format-message';
import { DefinitionSummary } from '@bfc/shared';

import { EdgeAddButtonSize } from '../../../adaptive-sdk/constants/ElementSizes';
import { NodeRendererContext } from '../../../store/NodeRendererContext';
import { SelectionContext } from '../../../store/SelectionContext';
import { SelfHostContext } from '../../../store/SelfHostContext';
import { AttrNames } from '../../../constants/ElementAttributes';
import { MenuTypes } from '../../../constants/MenuTypes';
import { ObiColors } from '../../../adaptive-sdk/constants/ElementColors';
import { IconMenu } from '../../lib/IconMenu';

import { createActionMenu } from './createSchemaMenu';

interface EdgeMenuProps {
  id: string;
  onClick: (item: string | null) => void;
}

export const EdgeMenu: React.FC<EdgeMenuProps> = ({ id, onClick }) => {
  const { clipboardActions, customSchemas } = useContext(NodeRendererContext);
  const selfHosted = useContext(SelfHostContext);
  const { selectedIds } = useContext(SelectionContext);
  const nodeSelected = selectedIds.includes(`${id}${MenuTypes.EdgeMenu}`);
  const declareElementAttributes = (id: string) => {
    return {
      [AttrNames.SelectableElement]: true,
      [AttrNames.EdgeMenuElement]: true,
      [AttrNames.SelectedId]: `${id}${MenuTypes.EdgeMenu}`,
    };
  };

  const [menuSelected, setMenuSelected] = useState<boolean>(false);
  let boxShaow = '0px 2px 8px rgba(0, 0, 0, 0.1)';
  boxShaow += menuSelected ? `,0 0 0 2px ${ObiColors.AzureBlue}` : nodeSelected ? `, 0 0 0 2px ${ObiColors.Black}` : '';

  const handleMenuShow = menuSelected => {
    setMenuSelected(menuSelected);
  };

  const menuItems = createActionMenu(
    item => {
      if (!item) return;
      onClick(item.key);
    },
    {
      isSelfHosted: selfHosted,
      enablePaste: Array.isArray(clipboardActions) && !!clipboardActions.length,
    },
    // Custom Action 'oneOf' arrays from schema file
    customSchemas.map(x => x.oneOf).filter(oneOf => Array.isArray(oneOf) && oneOf.length) as DefinitionSummary[][]
  );
  return (
    <div
      style={{
        width: EdgeAddButtonSize.width,
        height: EdgeAddButtonSize.height,
        borderRadius: '8px',
        backdropFilter: 'white',
        boxShadow: boxShaow,
        overflow: 'hidden',
        background: 'white',
      }}
      className={classnames({ 'step-renderer-container--selected': nodeSelected })}
      {...declareElementAttributes(id)}
    >
      <IconMenu
        iconName="Add"
        iconStyles={{
          background: 'white',
          color: '#005CE6',
          selectors: {
            ':focus': {
              outline: 'none',
              selectors: {
                '::after': {
                  outline: 'none !important',
                },
              },
            },
          },
        }}
        iconSize={7}
        nodeSelected={nodeSelected}
        menuItems={menuItems}
        label={formatMessage('Add')}
        handleMenuShow={handleMenuShow}
      />
    </div>
  );
};
