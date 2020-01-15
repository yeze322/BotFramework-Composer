// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import get from 'lodash/get';

import { Project } from '../store';

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

/**
 * inputs project and xpath. returns dialog / trigger
 * @param project dialogs assets
 * @param xpath tigger: 'root.triggers[0].actions[1].dialog.triggers[0]'
 */
export const parseXpathWithContext = (
  project: Project,
  xpath: string
): { dialogPath: string; triggerPath: string; actionPath: string } => {
  const { dialogPath, triggerPath, actionPath } = parseXpath(xpath);
  if (dialogPath === 'Main') return { dialogPath: 'Main', triggerPath, actionPath };

  const parts = dialogPath.split('.dialog.');
  for (let i = 0; i < parts.length - 2; i++) {
    parts[i] += '.dialog';
  }

  try {
    let currentDialogName = 'Main';
    for (const part of parts) {
      const currentDialogObj = project[currentDialogName];
      const nextDialogName = get(currentDialogObj, part, '');
      currentDialogName = nextDialogName;
    }
    return { dialogPath: currentDialogName, triggerPath: triggerPath, actionPath };
  } catch (e) {
    console.warn(e.message);
    return { dialogPath, triggerPath, actionPath };
  }
};

export const getDialogNameFromDialogPath = (trace, dialogPath: string) => {
  return get(trace, [dialogPath, '_id'], 'Main');
};
