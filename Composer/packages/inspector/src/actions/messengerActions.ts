// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const INIT = 'init';
export const init = ({ project, trace }) => {
  return {
    type: INIT,
    payload: {
      project,
      trace,
    },
  };
};

export const SET_DIALOG = 'SET_DIALOG';
export const setDialog = dialogName => {
  return {
    type: SET_DIALOG,
    payload: dialogName || 'Main',
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
