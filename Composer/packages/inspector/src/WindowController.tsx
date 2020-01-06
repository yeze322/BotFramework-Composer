// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useReducer } from 'react';

import { reducer } from './reducer';
import { initialStore } from './store';
import { setTrigger, setAction } from './actions/messengerActions';

export const WindowController = () => {
  const [state, dispatch] = useReducer(reducer, initialStore);

  const globalWindow = window as any;
  globalWindow.setTriggerId = triggerId => dispatch(setTrigger(triggerId));
  globalWindow.setActionId = actionId => dispatch(setAction(actionId));

  return <></>;
};
