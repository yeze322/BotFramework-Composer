// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useReducer, Dispatch } from 'react';

import { reducer } from '../reducer';

import { initialStore } from './index';
type Action = { type: string; payload?: any };

const applyMiddleware = (fn, middleware?): Dispatch<Action> => {
  if (typeof fn !== 'function') return () => {};

  if (typeof middleware === 'function') {
    return (...params) => {
      middleware(...params);
      return fn(...params);
    };
  }
  return fn;
};

export const useStore = (dispatchMiddleware?: (action: Action) => void) => {
  const [state, dispatch] = useReducer(reducer, initialStore);
  return {
    store: state,
    dispatch: applyMiddleware(dispatch, dispatchMiddleware),
  };
};
