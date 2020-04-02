// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum FileChangeType {
  DELETE = 1,
  UPDATE,
  CREATE,
}

export enum FileExtensions {
  Dialog = '.dialog',
  Lu = '.lu',
  Lg = '.lg',
}

export type FileErrorHandler = (error) => void;
