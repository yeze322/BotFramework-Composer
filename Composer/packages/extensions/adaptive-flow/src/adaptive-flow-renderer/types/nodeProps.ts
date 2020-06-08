// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Boundary } from '../models/Boundary';
import { FlowEventHandler } from '../events/FlowEvent.types';

export interface NodeProps {
  id: string;
  tab?: string;
  data: any;
  focused?: boolean;
  onEvent: FlowEventHandler;
  onResize: (boundary: Boundary, id?) => object | void;

  isRoot?: boolean;
}

export const defaultNodeProps = {
  id: '',
  data: {},
  onEvent: () => {},
  onResize: () => {},
};
