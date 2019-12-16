// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { ObiTypes } from '../../../constants/ObiTypes';
import { IfCondition } from '../layout-steps/IfCondition';
import { SwitchCondition } from '../layout-steps/SwitchCondition';
import { Foreach } from '../layout-steps/Foreach';
import { BaseInput } from '../layout-steps/BaseInput';
import { EventRule } from '../events/EventRule';
import { IntentRule } from '../events/IntentRule';
import { UnknownIntentRule } from '../events/UnknownIntentRule';
import { ConversationUpdateActivityRule } from '../events/ConversationUpdateActivityRule';
import { DefaultRenderer } from '../steps/DefaultRenderer';
import { BeginDialog } from '../steps/BeginDialog';
import { ReplaceDialog } from '../steps/ReplaceDialog';
import { ActivityRenderer } from '../steps/ActivityRenderer';
import { ChoiceInput } from '../steps/ChoiceInput';
import { BotAsks } from '../steps/BotAsks';
import { UserInput } from '../steps/UserInput';
import { InvalidPromptBrick } from '../steps/InvalidPromptBrick';

export const elementRendererMap = {
  [ObiTypes.ConditionNode]: DefaultRenderer,
  [ObiTypes.ChoiceInputDetail]: ChoiceInput,
  [ObiTypes.BotAsks]: BotAsks,
  [ObiTypes.UserAnswers]: UserInput,
  [ObiTypes.InvalidPromptBrick]: InvalidPromptBrick,
  default: DefaultRenderer,
};

export const actionRendererMap = {
  [ObiTypes.BeginDialog]: BeginDialog,
  [ObiTypes.ReplaceDialog]: ReplaceDialog,
  [ObiTypes.IfCondition]: IfCondition,
  [ObiTypes.SwitchCondition]: SwitchCondition,
  [ObiTypes.Foreach]: Foreach,
  [ObiTypes.ForeachPage]: Foreach,
  [ObiTypes.AttachmentInput]: BaseInput,
  [ObiTypes.ConfirmInput]: BaseInput,
  [ObiTypes.DateTimeInput]: BaseInput,
  [ObiTypes.NumberInput]: BaseInput,
  [ObiTypes.TextInput]: BaseInput,
  [ObiTypes.ChoiceInput]: BaseInput,
  [ObiTypes.SendActivity]: ActivityRenderer,
  default: DefaultRenderer,
};

export const eventRendererMap = {
  [ObiTypes.OnCondition]: EventRule,
  [ObiTypes.OnIntent]: IntentRule,
  [ObiTypes.OnUnknownIntent]: UnknownIntentRule,
  [ObiTypes.OnConversationUpdateActivity]: ConversationUpdateActivityRule,
  default: UnknownIntentRule,
};
