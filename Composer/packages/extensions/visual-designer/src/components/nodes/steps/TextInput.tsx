/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { DialogGroup } from 'shared-menus';

import { NodeColors } from '../../../constants/ElementColors';
import { NodeEventTypes } from '../../../constants/NodeEventTypes';
import { textInputLayouter } from '../../../layouters/textInputLayouter';
import { NodeMenu } from '../../menus/NodeMenu';
import { FormCard } from '../templates/FormCard';
import { NodeProps } from '../nodeProps';
import { OffsetContainer } from '../../lib/OffsetContainer';
import { Diamond } from '../templates/Diamond';
import { Edge } from '../../lib/EdgeComponents';

export const TextInput: FC<NodeProps> = ({ id, data, onEvent }): JSX.Element => {
  const layout = textInputLayouter(id);
  const { boundary, nodeMap, edges } = layout;
  const { initPrompt, propertyBox, unrecognizedPrompt, invalidPrompt, diamond1, diamond2 } = nodeMap;

  return (
    <div className="Action-TextInput" css={{ width: boundary.width, height: boundary.height }}>
      <OffsetContainer offset={initPrompt.offset}>
        <FormCard
          nodeColors={NodeColors[DialogGroup.RESPONSE]}
          header={'Text Input'}
          corner={<NodeMenu id={id} onEvent={onEvent} />}
          icon={'MessageBot'}
          label={"What's your birthday"}
          onClick={() => {
            onEvent(NodeEventTypes.Focus, id);
          }}
        />
      </OffsetContainer>
      <OffsetContainer offset={propertyBox.offset}>
        <FormCard
          nodeColors={NodeColors[DialogGroup.INPUT]}
          header={'Text Input'}
          corner={<NodeMenu id={id} onEvent={onEvent} />}
          icon={'User'}
          label={'value.birthday'}
          onClick={() => {
            onEvent(NodeEventTypes.Focus, id);
          }}
        />
      </OffsetContainer>
      <OffsetContainer offset={unrecognizedPrompt.offset}>
        <FormCard
          nodeColors={NodeColors[DialogGroup.RESPONSE]}
          header={'Unrecognized prompt'}
          corner={<NodeMenu id={id} onEvent={onEvent} />}
          icon={'MessageBot'}
          label={'Wait what???'}
          onClick={() => {
            onEvent(NodeEventTypes.Focus, id);
          }}
        />
      </OffsetContainer>
      <OffsetContainer offset={invalidPrompt.offset}>
        <FormCard
          nodeColors={NodeColors[DialogGroup.RESPONSE]}
          header={'Invalid prompt'}
          corner={<NodeMenu id={id} onEvent={onEvent} />}
          icon={'MessageBot'}
          label={'You not born in 1980'}
          onClick={() => {
            onEvent(NodeEventTypes.Focus, id);
          }}
        />
      </OffsetContainer>
      <OffsetContainer offset={diamond1.offset}>
        <Diamond color={'#C4C4C4'} />
      </OffsetContainer>
      <OffsetContainer offset={diamond2.offset}>
        <Diamond color={'#C4C4C4'} />
      </OffsetContainer>
      {edges ? edges.map(x => <Edge key={x.id} {...x} />) : null}
    </div>
  );
};
