// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createContext } from 'react';

import { initialStore } from '.';

export const StoreContext = createContext({
  store: initialStore,
  dispatch: action => {},
});
