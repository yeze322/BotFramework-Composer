// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { transformAdaptiveTrigger } from '../../../src/adaptive-visual-sdk/transformers/transformAdaptiveTrigger';

test('should return safely when input null value', () => {
  const result = transformAdaptiveTrigger(null);
  expect(result).toBeNull();
});

test('should parse single rule correctly with empty parentPath', () => {
  const json = {
    $kind: 'Microsoft.IntentRule',
    actions: [{ $kind: 'any' }],
  };
  const result = transformAdaptiveTrigger(json, '');
  if (!result) throw new Error('transformObiRules got a wrong result');

  expect(result.stepGroup).toBeTruthy();
  expect(result.stepGroup.id).toEqual('actions');
  expect(result.stepGroup.json.children.length === json.actions.length).toBeTruthy();
});

test('should parse single rule correctly with real parentPath', () => {
  const json = {
    $kind: 'Microsoft.IntentRule',
    actions: [{ $kind: 'any' }],
  };
  const result = transformAdaptiveTrigger(json, 'events[0]');
  if (!result) throw new Error('transformObiRules got a wrong result');

  expect(result.stepGroup).toBeTruthy();
  expect(result.stepGroup.id).toEqual('events[0].actions');
  expect(result.stepGroup.json.children.length === json.actions.length).toBeTruthy();
});
