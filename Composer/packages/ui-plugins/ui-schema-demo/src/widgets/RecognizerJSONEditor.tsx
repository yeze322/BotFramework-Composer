// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { FieldProps } from '@bfc/extension-client';
import { JsonEditor } from '@bfc/code-editor';

export const RecognizerJSONEditor: React.FC<FieldProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <h5>JSON Editor for Recognizer</h5>
      <JsonEditor
        key="customRecognizerField"
        height={200}
        id="customRecognizerField"
        value={value as object}
        onChange={onChange}
      />
    </div>
  );
};
