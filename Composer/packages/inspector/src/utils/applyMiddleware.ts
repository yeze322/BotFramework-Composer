// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const applyMiddleware = (fn, middleware?) => {
  if (typeof fn !== 'function') return () => {};

  if (typeof middleware === 'function') {
    return (...params) => {
      middleware(...params);
      return fn(...params);
    };
  }
  return fn;
};
