import nanoid from 'nanoid/generate';

import { appschema } from './appschema';
import { visitAdaptiveAction, copyLgActivity } from './copyUtils';

interface DesignerAttributes {
  name: string;
  description: string;
}

export interface DesignerData {
  name?: string;
  description?: string;
  id: string;
}

const initialDialogShape = {
  'Microsoft.AdaptiveDialog': {
    $type: 'Microsoft.AdaptiveDialog',
    events: [
      {
        $type: 'Microsoft.OnBeginDialog',
        $designer: {
          name: 'BeginDialog',
        },
      },
    ],
  },
  'Microsoft.OnConversationUpdateActivity': {
    $type: 'Microsoft.OnConversationUpdateActivity',
    constraint: "toLower(turn.Activity.membersAdded[0].name) != 'bot'",
  },
};

export function getNewDesigner(name: string, description: string) {
  return {
    $designer: {
      name,
      description,
      id: nanoid('1234567890', 6),
    },
  };
}

export const getDesignerId = (data?: DesignerData) => {
  const newDesigner: DesignerData = {
    ...data,
    id: nanoid('1234567890', 6),
  };

  return newDesigner;
};

const assignDefaults = (data: {}, currentSeed = {}) => {
  for (const field in data) {
    if (field !== '$designer' && data[field].type === 'object') {
      // recurse on subtree's properties
      currentSeed[field] = assignDefaults(data[field].properties);
    }
    if (data[field].const !== null && data[field].const !== undefined) {
      currentSeed[field] = data[field].const;
    }
    if (data[field].default !== null && data[field].default !== undefined) {
      currentSeed[field] = data[field].default;
    }
  }
  return Object.keys(currentSeed).length > 0 ? currentSeed : undefined;
};

export const seedDefaults = (type: string) => {
  if (!appschema.definitions[type]) return {};
  const { properties } = appschema.definitions[type];
  return assignDefaults(properties);
};

const DEEP_COPY_TYPES = ['Microsoft.SendActivity'];
export const needsDeepCopy = $type => {
  return DEEP_COPY_TYPES.includes($type);
};

export const deepCopyAction = async (data, lgApi) => {
  if (!data || !data.$type) return {};

  // Deep copy the original data.
  const copy = JSON.parse(JSON.stringify(data));

  // Copy the $designer part (if exists) or create new $designer part.
  const overrideDesigner = data => {
    const $designer = data.$designer ? getDesignerId(data.$designer) : getNewDesigner('', '');
    data.$designer = $designer;
  };

  // Copy specific parts an Adaptive action cares.
  const overrideContent = async data => {
    if (data.$type === 'Microsoft.SendActivity') {
      data.activity = await copyLgActivity(data.activity, lgApi);
    }
  };

  await visitAdaptiveAction(copy, async data => {
    overrideDesigner(data);
    await overrideContent(data);
  });

  return copy;
};

export const seedNewDialog = (
  $type: string,
  designerAttributes: Partial<DesignerAttributes> = {},
  optionalAttributes: object = {}
): object => {
  return {
    $type,
    $designer: {
      id: nanoid('1234567890', 6),
      ...designerAttributes,
    },
    ...(initialDialogShape[$type] || {}),
    ...optionalAttributes,
    ...seedDefaults($type),
  };
};
