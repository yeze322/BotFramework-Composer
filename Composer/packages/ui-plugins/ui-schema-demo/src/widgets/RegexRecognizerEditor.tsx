// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { FieldProps } from '@bfc/extension-client';
import cloneDeep from 'lodash/cloneDeep';

export const RegexRecognizerEditor: React.FC<FieldProps> = (props) => {
  const { value, onChange } = props;
  const intents = value.intents;

  if (!Array.isArray(intents)) return null;

  const updatePattern = (intentIndex, newRegex) => {
    const newData = cloneDeep(value);
    newData.intents[intentIndex].pattern = newRegex;
    onChange(newData);
  };

  const rows = intents.map(({ intent, pattern }, index) => {
    return (
      <div key={index}>
        {intent} |||{' '}
        <input
          value={pattern}
          onChange={(e) => {
            const newRegex = e.currentTarget.value;
            updatePattern(index, newRegex);
          }}
        />
      </div>
    );
  });

  return <>{rows}</>;
};
