// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';

import { StoreContext } from './store/StoreContext';
import RuntimeMessageCenter from './messengers/RuntimeMessageCenter';
import { setAction, setTrigger } from './actions/messengerActions';

const runtimeMessageCenter = new RuntimeMessageCenter();

export const SocketController = () => {
  const { store, dispatch } = useContext(StoreContext);

  runtimeMessageCenter.triggerChanged$.subscribe(data => {
    dispatch(setTrigger(data));
  });

  runtimeMessageCenter.actionChanged$.subscribe(data => {
    dispatch(setAction(data));
  });
  return <></>;
};
