// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SET_PROJECT = 'SET_PROJECT';
export const setProject = project => {
  return {
    type: SET_PROJECT,
    payload: project,
  };
};

export const SET_TRIGGER = 'SET_TRIGGER';
export const setTrigger = triggerPath => {
  return {
    type: SET_TRIGGER,
    payload: triggerPath || '',
  };
};

export const SET_ACTION = 'SET_ACTION';
export const setAction = actionPath => {
  return {
    type: SET_ACTION,
    payload: actionPath || '',
  };
};

export const APPEND_LOG = 'APPEND_LOG';
export const appendLog = (nodePath, severity, text) => {
  return {
    type: APPEND_LOG,
    payload: {
      severity: severity || 'info',
      text,
    },
  };
};
