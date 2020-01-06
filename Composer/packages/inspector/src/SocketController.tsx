// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';

import { StoreContext } from './store/StoreContext';
import RuntimeMessageCenter from './messengers/RuntimeMessageCenter';
import { setAction, setTrigger } from './actions/messengerActions';

let storeDispatcher = action => {};

const runtimeMessageCenter = new RuntimeMessageCenter((eName, eData) => console.log(`Event ${eName} - ${eData}`));
runtimeMessageCenter.triggerChanged$.subscribe(data => {
  storeDispatcher(setTrigger(data));
});

runtimeMessageCenter.actionChanged$.subscribe(data => {
  storeDispatcher(setAction(data));
});

export const SocketController = () => {
  const { store, dispatch } = useContext(StoreContext);
  storeDispatcher = dispatch;
  return <></>;
};
