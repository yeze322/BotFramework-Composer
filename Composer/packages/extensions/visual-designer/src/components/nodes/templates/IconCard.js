import React from 'react';

import { Icon } from '../icons/icon';
import { EventNodeSize } from '../../../shared/elementSizes';

const boxWidth = EventNodeSize.width;
const boxHeight = EventNodeSize.height;

export const IconCard = ({ corner, label, icon, themeColor, onClick }) => {
  const containerStyle = {
    width: boxWidth,
    height: boxHeight,
    fontSize: '14px',
    lineHeight: '19px',
    cursor: 'pointer',
    overflow: 'hidden',
    backgroundColor: themeColor,
    color: '#000000',
    borderRadius: '2px 2px 0 0',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '9px',
    boxSizing: 'border-box',
  };
  return (
    <div
      style={containerStyle}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Icon icon={icon || 'MessageBot'} color={themeColor} fill="black" />
      <div
        style={{
          lineHeight: '29px',
          width: 'calc(100% - 68px)',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        title={typeof label === 'string' ? label : ''}
      >
        {label}
      </div>
      <div style={{ position: 'absolute', top: 9, right: 0 }}>{corner}</div>
    </div>
  );
};

IconCard.defaultProps = {
  onClick: () => {},
  onClickIcon: () => {},
};
