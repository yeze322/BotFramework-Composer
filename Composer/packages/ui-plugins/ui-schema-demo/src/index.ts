// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import mergeWith from 'lodash/mergeWith';
import {
  PluginConfig,
  FormUISchema,
  UISchema,
  MenuUISchema,
  FlowUISchema,
  RecognizerUISchema,
  TriggerUISchema,
} from '@bfc/extension-client';

import { DefaultMenuSchema } from './defaultMenuSchema';
import { DefaultFlowSchema } from './defaultFlowSchema';
import { DefaultRecognizerSchema } from './defaultRecognizerSchema';
import { DefaultTriggerSchema } from './defaultTriggerSchema';
import { DefaultFormSchema } from './DefaultFormSchema';
import { VerySmallAction } from './widgets/VerySmallAction';
import { RegexRecognizerEditor } from './widgets/RegexRecognizerEditor';
import { ModernCard } from './widgets/ModernCard';

const synthesizeUISchema = (
  formSchema: FormUISchema,
  menuSchema: MenuUISchema,
  flowSchema: FlowUISchema,
  triggerSchema: TriggerUISchema,
  recognizerSchema: RecognizerUISchema
): UISchema => {
  let uischema: UISchema = {};
  uischema = mergeWith(uischema, formSchema, (origin, formOption) => ({ ...origin, form: formOption }));
  uischema = mergeWith(uischema, menuSchema, (origin, menuOption) => ({ ...origin, menu: menuOption }));
  uischema = mergeWith(uischema, flowSchema, (origin, flowOption) => ({ ...origin, flow: flowOption }));
  uischema = mergeWith(uischema, triggerSchema, (origin, triggerOption) => ({ ...origin, trigger: triggerOption }));
  uischema = mergeWith(uischema, recognizerSchema, (origin, opt) => ({ ...origin, recognizer: opt }));
  return uischema;
};

const config: PluginConfig = {
  uiSchema: synthesizeUISchema(
    DefaultFormSchema,
    DefaultMenuSchema,
    DefaultFlowSchema,
    DefaultTriggerSchema,
    DefaultRecognizerSchema
  ),
  widgets: {
    flow: {
      VerySmallAction,
      ModernCard,
    },
    recognizer: {
      RegexRecognizerEditor,
    },
  },
};

export default config;
