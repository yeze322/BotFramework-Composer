// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, FC } from 'react';
import { BaseSchema } from '@bfc/shared';

import { Terminator } from '../../components/decorations/Terminator';
import { Edge } from '../../components/lib/EdgeComponents';
import { StepGroup } from '../../components/nodes/groups/StepGroup';
import { OffsetContainer } from '../../components/lib/OffsetContainer';
import { EdgeMenu } from '../../components/menus/EdgeMenu';
import { ElementInterval, TriggerSize, TerminatorSize, InitNodeSize } from '../../constants/ElementSizes';
import { measureJsonBoundary } from '../../layouters/measureJsonBoundary';
import { Boundary } from '../../models/Boundary';
import { useWindowDimensions } from '../../utils/hooks';
import { ObiTypes } from '../../constants/ObiTypes';
import { EditorActionDispatcher } from '../../actions/types/EditorAction';
import reportActionPosition from '../../actions/reportActionPosition';
import { insertAdaptiveElementByType } from '../../actions/insertAdaptiveElement';
import mapNodeEventToEditorAction from '../mapNodeEventToEditorAction';
import { CreateAdaptiveJsonMenu, NodeOperationMenu } from '../adaptiveMenus';

const HeadSize = {
  width: TriggerSize.width,
  height: TriggerSize.height + ElementInterval.y / 2,
};
const TailSize = {
  width: TerminatorSize.width,
  height: TerminatorSize.height + ElementInterval.y / 2,
};

export interface AdaptiveActionListProps {
  path: string;
  actions: BaseSchema[];
  header: JSX.Element;
  dispatchAction: EditorActionDispatcher;
}

export const AdaptiveActionList: FC<AdaptiveActionListProps> = ({
  path,
  actions,
  header,
  dispatchAction,
}): JSX.Element => {
  const data = { $type: ObiTypes.StepGroup, children: actions };

  const stepGroupBoundary = measureJsonBoundary(data);
  const hasNoSteps = !Array.isArray(actions) || actions.length === 0;
  const contentBoundary = hasNoSteps ? new Boundary(TerminatorSize.width, TerminatorSize.height) : stepGroupBoundary;

  const editorWidth =
    Math.min(
      Math.max(0, HeadSize.width / 2, TailSize.width / 2, contentBoundary.axisX),
      Math.max(0, HeadSize.width / 2, TailSize.width / 2, contentBoundary.width - contentBoundary.axisX)
    ) * 2;
  const editorHeight = HeadSize.height + TailSize.height + contentBoundary.height;
  const editorAxisX = editorWidth / 2;

  const { width } = useWindowDimensions();

  useEffect(() => {
    const coachMarkPosition = {
      x: (width + editorWidth) / 2,
      y: (hasNoSteps ? InitNodeSize.height / 2 : (3 * InitNodeSize.height) / 2 + ElementInterval.y) + 48,
    };
    dispatchAction(reportActionPosition(coachMarkPosition.x, coachMarkPosition.y));
  }, [width]);

  const content = hasNoSteps ? (
    <EdgeMenu
      onClick={$type => dispatchAction(insertAdaptiveElementByType(path, 0, $type))}
      data-testid="StepGroupAdd"
      id={`${path}[0]`}
    />
  ) : (
    <StepGroup
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

  return (
    <div className="step-editor" css={{ position: 'relative', width: editorWidth, height: editorHeight }}>
      <OffsetContainer offset={{ x: editorAxisX - HeadSize.width / 2, y: 0 }}>
        <div className="step-editor__head" css={{ ...HeadSize, position: 'relative' }}>
          <OffsetContainer offset={{ x: 0, y: 0 }}>{header}</OffsetContainer>
          <Edge direction="y" x={HeadSize.width / 2} y={TriggerSize.height} length={ElementInterval.y / 2} />
        </div>
      </OffsetContainer>
      <OffsetContainer offset={{ x: editorAxisX - contentBoundary.axisX, y: HeadSize.height }}>
        {content}
      </OffsetContainer>
      <OffsetContainer offset={{ x: editorAxisX - TailSize.width / 2, y: contentBoundary.height + HeadSize.height }}>
        <div className="step-editor__tail" css={{ ...TailSize, position: 'relative' }}>
          <Edge direction="y" x={TailSize.width / 2} y={0} length={ElementInterval.y / 2} directed={true} />
          <OffsetContainer offset={{ x: -1, y: ElementInterval.y / 2 }}>
            <Terminator />
          </OffsetContainer>
        </div>
      </OffsetContainer>
    </div>
  );
};
