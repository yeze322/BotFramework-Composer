// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useReducer } from 'react';

import { applyMiddleware } from '../utils/applyMiddleware';
import { reducer } from '../reducer';

import { initialStore } from './index';
type Action = { type: string; payload?: any };

export const useStore = (dispatchMiddleware?: (action: Action) => void) => {
  const [state, dispatch] = useReducer(reducer, initialStore);
  return {
    store: state,
    dispatch: applyMiddleware(dispatch, dispatchMiddleware),
  };
};
