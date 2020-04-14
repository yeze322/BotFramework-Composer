// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PluginConfig } from '@bfc/extension';

import uiSchema from './uiSchema';
import flowSchema from './flowSchema';

const config: PluginConfig = {
  uiSchema,
  visualSchema: {
    schema: flowSchema,
  },
};

export default config;
