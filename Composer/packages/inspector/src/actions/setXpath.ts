// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SET_XPATH_TRIGGER = 'SET_XPATH_TRIGGER';
export const setXpathTrigger = (xpath = '') => {
  return {
    type: SET_XPATH_TRIGGER,
    payload: xpath,
  };
};

export const SET_XPATH_ACTION = 'SET_XPATH_ACTION';
export const setXpathAction = (xpath = '') => {
  return {
    type: SET_XPATH_ACTION,
    payload: xpath,
  };
};
