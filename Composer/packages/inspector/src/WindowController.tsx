// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';

import { setTrigger, setAction } from './actions/messengerActions';
import { StoreContext } from './store/StoreContext';

export const WindowController = () => {
  const { store, dispatch } = useContext(StoreContext);

  const globalWindow = window as any;
  globalWindow.setTriggerId = triggerId => dispatch(setTrigger(triggerId));
  globalWindow.setActionId = actionId => dispatch(setAction(actionId));

  return <></>;
};
