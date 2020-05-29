// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdaptiveKinds } from '../constants/AdaptiveKinds';
import { IndexedNode } from '../models/IndexedNode';
import { normalizeAdaptiveAction } from '../utils/adaptive/actionBuilder';

export function transformStepGroup(input, groupId): IndexedNode[] {
  if (!input || input.$kind !== AdaptiveKinds.StepGroup) return [];
  if (!input.children || !Array.isArray(input.children)) return [];

  return input.children.map((step, index) => new IndexedNode(`${groupId}[${index}]`, normalizeAdaptiveAction(step)));
}
