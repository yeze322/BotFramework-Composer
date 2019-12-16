// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useMemo, useRef, FC } from 'react';
import isEqual from 'lodash/isEqual';
import { BaseSchema } from '@bfc/shared';

import { outlineObiJson } from '../utils/outlineObiJson';
import { ObiFieldNames } from '../constants/ObiFieldNames';
import { EditorActionDispatcher } from '../actions/types/EditorAction';
import setFocusState from '../actions/setFocusState';
import { Trigger } from '../components/nodes/steps/Trigger';

import { AdaptiveActionList } from './list/AdaptiveActionList';

export interface AdaptiveEventProps {
  path: string;
  data: BaseSchema;
  dispatchAction: EditorActionDispatcher;
}

export const AdaptiveEvent: FC<AdaptiveEventProps> = ({ path, data, dispatchAction }): JSX.Element => {
  const outlineCache = useRef();
  const outlineVersion = useRef(0);

  useMemo(() => {
    const newOutline = outlineObiJson(data);
    if (!isEqual(newOutline, outlineCache.current)) {
      outlineCache.current = newOutline;
      outlineVersion.current += 1;
    }
  }, [path, data]);

  const actionList = data[ObiFieldNames.Actions] || [];
  const actionListPath = `${path}.${ObiFieldNames.Actions}`;

  return (
    <div
      className="rule-editor"
      data-testid="RuleEditor"
      css={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={e => {
        e.stopPropagation();
        dispatchAction(setFocusState(''));
      }}
    >
      <AdaptiveActionList
        key={actionListPath + '?version=' + outlineVersion.current}
        path={actionListPath}
        actions={actionList}
        dispatchAction={dispatchAction}
        header={<Trigger data={data} />}
      />
    </div>
  );
};
