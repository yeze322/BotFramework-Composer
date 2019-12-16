// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import get from 'lodash/get';
import { MicrosoftAdaptiveDialog } from '@bfc/shared';

import { ObiFieldNames } from '../constants/ObiFieldNames';
import { EditorActionDispatcher } from '../actions/types/EditorAction';

import { AdaptiveEventList } from './list/AdaptiveEventList';

export interface AdaptiveDialogProps {
  path: string;
  data: MicrosoftAdaptiveDialog;
  dispatchAction: EditorActionDispatcher;
}

export const AdaptiveDialog: FC<AdaptiveDialogProps> = ({ data, dispatchAction }): JSX.Element => {
  const eventsPath = ObiFieldNames.Events;
  const events = get(data, eventsPath, []);

  return <AdaptiveEventList path={eventsPath} events={events} dispatchAction={dispatchAction} />;
};
