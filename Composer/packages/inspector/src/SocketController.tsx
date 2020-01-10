// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext } from 'react';

import { StoreContext } from './store/StoreContext';
import RuntimeMessageCenter from './messengers/RuntimeMessageCenter';
import { setXpath } from './actions/setXpath';

let storeDispatcher = action => {};

const runtimeMessageCenter = new RuntimeMessageCenter((eName, eData) => console.log(`Event ${eName} - ${eData}`));
runtimeMessageCenter.triggerChanged$.subscribe(data => {
  storeDispatcher(setXpath(data));
});

runtimeMessageCenter.actionChanged$.subscribe(data => {
  storeDispatcher(setXpath(data));
});

export const SocketController = () => {
  const { store, dispatch } = useContext(StoreContext);
  storeDispatcher = dispatch;
  return <></>;
};
