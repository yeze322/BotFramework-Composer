// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { FC } from 'react';
import { BaseSchema } from '@bfc/shared';

import { Panel } from '../../components/lib/Panel';
import { EventMenu } from '../../components/menus/EventMenu';
import { ObiTypes } from '../../constants/ObiTypes';
import { EditorActionDispatcher } from '../../actions/types/EditorAction';
import setEventPath from '../../actions/setEventPath';
import { insertAdaptiveElementByType } from '../../actions/insertAdaptiveElement';
import { RuleGroup } from '../../components/nodes/groups/RuleGroup';
import { CollapsedRuleGroup } from '../../components/nodes/groups/CollapsedRuleGroup';
import mapNodeEventToEditorAction from '../mapNodeEventToEditorAction';

export interface AdaptiveEventListProps {
  path: string;
  events: BaseSchema[];
  dispatchAction: EditorActionDispatcher;
}

export const AdaptiveEventList: FC<AdaptiveEventListProps> = ({ path, events, dispatchAction }): JSX.Element => {
  const eventCount = events.length;
  const title = `Events (${eventCount})`;

  const insertEvent = $type => dispatchAction(insertAdaptiveElementByType(path, eventCount, $type));

  const data = { $type: ObiTypes.RuleGroup, children: events };
  return (
    <Panel
      title={title}
      onClickContent={e => {
        e.stopPropagation();
        dispatchAction(setEventPath(''));
      }}
      collapsedItems={<CollapsedRuleGroup count={eventCount} />}
      addMenu={<EventMenu onClick={insertEvent} data-testid="EventsEditorAdd" />}
    >
      <RuleGroup
        key={path}
        id={path}
        data={data}
        onEvent={(...params) => {
          const action = mapNodeEventToEditorAction(...params);
          if (action) {
            dispatchAction(action);
          }
        }}
      />
    </Panel>
  );
};

AdaptiveEventList.defaultProps = {
  path: '',
  events: [],
  dispatchAction: () => null,
};
