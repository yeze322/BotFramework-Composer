// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const parseXpath = (xpath = '') => {
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

  return result;
};

export const SET_XPATH_TRIGGER = 'SET_XPATH_TRIGGER';
export const setXpathTrigger = (xpath = '') => {
  const paths = parseXpath(xpath);
  return {
    type: SET_XPATH_TRIGGER,
    payload: xpath,
  };
};

export const SET_XPATH_ACTION = 'SET_XPATH_ACTION';
export const setXpathAction = (xpath = '') => {
  const paths = parseXpath(xpath);
  return {
    type: SET_XPATH_ACTION,
    payload: xpath,
  };
};
