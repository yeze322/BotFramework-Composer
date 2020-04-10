// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PluginConfig } from '@bfc/extension';
import { SDKKinds } from '@bfc/shared';

import { LgField } from './LgField';
import { LgWidget } from './LgWidget';

const config: PluginConfig = {
  uiSchema: {
    [SDKKinds.SendActivity]: {
      properties: {
        activity: {
          label: 'Language Generation',
          description:
            'What your bot says to the user. This is a template used to create the outgoing message. It can include language generation rules, properties from memory, and other features.\n\nFor example, to define variations that will be chosen at random, write:\n- hello\n- hi',
          helpLink: 'https://aka.ms/lg-file-format',
        },
      },
    },
    [SDKKinds.IActivityTemplate]: {
      field: LgField,
    },
  },
  visual: {
    widgets: {
      LgWidget: LgWidget,
    },
    schema: {
      [SDKKinds.SendActivity]: {
        widget: 'ActionCard',
        header: {
          widget: 'ActionHeader',
          icon: 'MessageBot',
          colors: {
            theme: '#EEEAF4',
            icon: '#5C2E91',
          },
        },
        body: {
          widget: 'LgWidget',
          field: 'activity',
        },
      },
    },
  },
};

export default config;
