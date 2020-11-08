// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { WidgetComponent, WidgetContainerProps } from '@bfc/extension-client';

export interface VerySmallActionProps extends WidgetContainerProps {
  size: number;
}

export const VerySmallAction: WidgetComponent<VerySmallActionProps> = ({ size, ...widgetContext }) => {
  const { data } = widgetContext;
  return (
    <div style={{ width: size ?? 200, height: size ?? 200, overflow: 'scroll' }}>
      {JSON.stringify(data, null, '\t')}
    </div>
  );
};
