// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Project } from '../store';

/**
 * inputs project and xpath. returns dialog / trigger
 * @param project dialogs assets
 * @param xpath tigger: 'root.triggers[0].actions[1].dialog.triggers[0]'
 */
export const resolveTriggerXpath = (project: Project, xpath: string) => {
  return;
};

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
