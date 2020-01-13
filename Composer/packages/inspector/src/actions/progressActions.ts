// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';

export const changeProgress = (logIndex: number) => {
  return {
    type: CHANGE_PROGRESS,
    payload: logIndex,
  };
};

export const RESET_PROGRESS = 'RESET_PROGRESS';
export const resetProgress = () => {
  return {
    type: RESET_PROGRESS,
  };
};
