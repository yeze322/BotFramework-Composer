// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdaptiveKinds } from '../../constants/AdaptiveKinds';

export function normalizeAdaptiveAction(data) {
  let action = data;
  // Grammar sugar provide by Adaptive runtime.
  if (typeof data === 'string') {
    action = {
      $kind: AdaptiveKinds.BeginDialog,
      dialog: action,
    };
  }
  return action;
}
