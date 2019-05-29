import React from 'react';

import { IconMenu } from '../nodes/templates/IconMenu';
import { EdgeAddButtonSize } from '../../shared/elementSizes';
import { dialogGroups, DialogGroup } from '../../shared/appschema';

const createStepMenu = handleType => {
  const stepLabels = [
    DialogGroup.INPUT,
    DialogGroup.RESPONSE,
    DialogGroup.MEMORY,
    DialogGroup.STEP,
    DialogGroup.CODE,
    DialogGroup.LOG,
  ];

  const stepMenuItems = stepLabels.map(x => {
    const item = dialogGroups[x];
    return {
      key: item.label,
      text: item.label,
      subMenuProps: {
        items: item.types.map($type => ({
          key: $type,
          text: $type,
          $type: $type,
        })),
        onItemClick: (e, item) => handleType(item.$type),
      },
    };
  });

  return stepMenuItems;
};

export const EdgeMenu = ({ onClick }) => {
  return (
    <div
      style={{
        width: EdgeAddButtonSize.width,
        height: EdgeAddButtonSize.height,
        borderRadius: '8px',
        backdropFilter: 'white',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      <IconMenu
        iconName="Add"
        iconStyles={{ background: 'white', color: '#005CE6', transform: 'scale(0.5)' }}
        menuItems={createStepMenu($type => onClick($type))}
      />
    </div>
  );
};
