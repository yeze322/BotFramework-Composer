// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Convert `triggers[0].actions[0]` to `triggers['12345'].actions['67890']`
 * @param data Current active Adaptive dialog json
 * @param path Current focus path in index format
 */
export const encodePathToDesignerPath = (data, path: string): string => {
  return path;
};

/**
 * Convert `triggers['12345'].actions['67890']` to `triggers[0].actions[0]`
 * @param data Current active Adaptive dialog json
 * @param path Current focus path in designer format
 */
export const decodeDesignerPathToPath = (data, designerPath: string): string => {
  return designerPath;
};
