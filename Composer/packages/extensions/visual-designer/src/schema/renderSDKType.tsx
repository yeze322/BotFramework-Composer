// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import get from 'lodash/get';
import { BaseSchema } from '@bfc/shared';

import { UIWidget, UIWidgetProp, UI_WIDGET_KEY, Value } from './UiSchema.types';
import { uiSchema } from './uischema';

const SDKTypeKey = '$type';

const isUiWidget = (input): boolean => typeof get(input, UI_WIDGET_KEY) === 'function';

const buildWidgetComponent = (data, schema: UIWidget) => {
  const Widget = get(schema, UI_WIDGET_KEY);
  return Widget;
};

const buildWidgetProperty = (data: BaseSchema, rawPropValue: UIWidgetProp): Value | JSX.Element => {
  if (typeof rawPropValue === 'function') {
    const WidgetElement = rawPropValue;
    const element = WidgetElement(data);
    return element;
  }

  if (isUiWidget(rawPropValue)) {
    const WidgetDefinition: UIWidget = rawPropValue as UIWidget;
    const widget = renderWidget(data, WidgetDefinition);
    return widget;
  }
  return rawPropValue;
};

const buildWidgetProps = (data, schema: UIWidget) => {
  const { [UI_WIDGET_KEY]: _, ...rawProps } = schema;

  return Object.keys(rawProps).reduce((props, propName) => {
    const propValue = rawProps[propName];
    props[propName] = buildWidgetProperty(data, propValue);
    return props;
  }, {});
};

const renderWidget = (inputData, schema: UIWidget): JSX.Element => {
  const Widget = buildWidgetComponent(inputData, schema);
  const props = buildWidgetProps(inputData, schema);
  return <Widget data={inputData} {...props} />;
};

/** Core renderer */
const renderDefaultAction = (data: BaseSchema) => <></>;

export const renderSDKType = (data: BaseSchema): JSX.Element => {
  const $type = get(data, SDKTypeKey);
  const schema: UIWidget = get(uiSchema, $type);
  if (!schema) return renderDefaultAction(data);

  return renderWidget(data, schema);
};
