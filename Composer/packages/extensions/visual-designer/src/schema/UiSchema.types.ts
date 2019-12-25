// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FC, ComponentClass } from 'react';
import { BaseSchema, SDKTypes } from '@bfc/shared';

/** schema */
export type UISchema = {
  [key in SDKTypes]?: UIWidget;
};

/** widget */
export const UI_WIDGET_KEY = 'ui:widget';

export interface UIWidget {
  [UI_WIDGET_KEY]: FC<WidgetContainerProps> | ComponentClass<WidgetContainerProps, any>;
  [propKey: string]: UIWidgetProp;
}

/** widget props */
export type UIWidgetProp = Value | DataTransformer | UIWidget;

export type Value = string | number | { [key: string]: any };

export type DataTransformer = (data: any) => string | number | object | JSX.Element;

export interface WidgetContainerProps {
  data: BaseSchema;
}

export interface WidgetElementProps {
  data: BaseSchema;
}
