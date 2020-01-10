// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SET_XPATH = 'SET_XPATH';
export const setXpath = (xpath = '') => {
  const result = {
    dialogPath: 'Main',
    triggerPath: '',
    actionPath: '',
  };

  const trunks = xpath.replace('root.', '').split('.dialog.');
  const last = trunks.pop();

  if (trunks.length) {
    result.dialogPath = trunks.join('.dialog.') + '.dialog';
  }

  if (last) {
    const [trigger, ...rest] = last.split('.');
    result.triggerPath = trigger;
    result.actionPath = rest.length ? last : '';
  }

  return {
    type: SET_XPATH,
    payload: result,
  };
};
