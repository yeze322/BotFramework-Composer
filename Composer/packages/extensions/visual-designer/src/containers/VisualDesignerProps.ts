// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { BaseSchema } from '@bfc/shared';

export interface VisualDesignerProps {
  /** Dialog */
  dialogId: string;
  dialogData: any;
  saveDialog: (newData: any, updatePath: string) => any;

  /** Focus states */
  focusedActions: string[];
  onFocusActions: (actionIds: string[]) => void;
  focusedEvent: string;
  onFocusEvent: (eventId: string) => void;

  /** Selection states */
  selection: string[];
  onSelect: (selectedIds: string[]) => void;

  /** Clipboard */
  clipboardActions: BaseSchema[];
  onChangeClipboard: (actions: BaseSchema[]) => void;

  /** url navigation */
  navToDialog: (dialogName: string) => void;

  /** undo & redo */
  undo: () => any;
  redo: () => any;

  /** LG api */
  updateLgTemplate: (id: string, templateName: string, templateStr: string) => Promise<void>;
  copyLgTemplate: (id: string, fromTemplateName: string, toTemplateName?: string) => Promise<string>;
  removeLgTemplate: (id: string, templateName: string) => Promise<void>;
  removeLgTemplates: (id: string, templateNames: string[]) => Promise<void>;

  /** onboarding experience */
  addCoachMarkPosition: (target: any) => any;
}
