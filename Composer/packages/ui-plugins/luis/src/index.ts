// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PluginConfig } from '@bfc/extension-client';
import { SDKKinds } from '@bfc/shared';
import formatMessage from 'format-message';

import { LuisIntentEditor } from './LuisIntentEditor';

const config: PluginConfig = {
  uiSchema: {
    [SDKKinds.LuisRecognizer]: {
      recognizer: {
        disabled: true,
        displayName: formatMessage('LUIS'),
        intentEditor: LuisIntentEditor,
        isSelected: (data) => {
          return typeof data === 'string' && data.endsWith('.lu');
        },
        handleRecognizerChange: (props, shellData) => {
          const { luFiles, currentDialog, locale } = shellData;
          const luFile = luFiles.find((f) => f.id === `${currentDialog.id}.${locale}`);

          if (luFile) {
            // strip locale out of id so it doesn't get serialized
            // into the .dialog file
            props.onChange(`${luFile.id.split('.')[0]}.lu`);
          } else {
            alert(formatMessage(`NO LU FILE WITH NAME {id}`, { id: currentDialog.id }));
          }
        },
        renameIntent: async (intentName, newIntentName, shellData, shellApi) => {
          const { currentDialog, locale } = shellData;
          shellApi.updateIntentTrigger(currentDialog.id, intentName, newIntentName);
          await shellApi.renameLuIntent(`${currentDialog.id}.${locale}`, intentName, newIntentName);
        },
      },
    },
  },
};

export default config;
