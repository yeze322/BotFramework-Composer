// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import React, { FunctionComponentFactory } from 'react';
import { SDKTypes } from '@bfc/shared';

import { UISchema } from './UiSchema.types';

/** Schema */
const ActionList: React.FC<any> = ({ actions, menu }) => <span>Action List{actions.length}</span>;

/** Containers */
const FormCard: React.FC<any> = ({ header, content, menu, theme }) => <div>FormCard</div>;
const PromptInput: React.FC<any> = ({ question, answer }) => <>PromptInput</>;
const IfElse: React.FC<any> = ({ condition, trueBranch, falseBranch }) => (
  <div>
    {condition}=={trueBranch}--{falseBranch}
  </div>
);
const SwitchCase: React.FC<any> = ({ condition, cases = [] }) => (
  <div>
    {condition}
    {cases.length}
  </div>
);
const ForLoop: React.FC<any> = ({ condition, loop }) => (
  <>
    {condition} aaa {loop}
  </>
);

/** Helpers */
const getNodeTheme = $type => ({ title: { color: 'red' }, icon: { color: 'blue' } });

/** Types */
export const uiSchema: UISchema = {
  [SDKTypes.SendActivity]: {
    'ui:widget': FormCard,
    header: data => data.title,
    content: data => data.activity,
  },
  [SDKTypes.IfCondition]: {
    'ui:widget': IfElse,
    condition: {
      'ui:widget': FormCard,
      title: 'Condition',
      content: data => data.condition,
      theme: {
        title: {
          color: 'green',
        },
      },
    },
    trueBranch: {
      'ui:widget': ActionList,
      actions: data => data.actions,
    },
    falseBranch: {
      'ui:widget': ActionList,
      actions: data => data.elseActions,
    },
  },
  [SDKTypes.TextInput]: {
    'ui:widget': PromptInput,
  },
};
