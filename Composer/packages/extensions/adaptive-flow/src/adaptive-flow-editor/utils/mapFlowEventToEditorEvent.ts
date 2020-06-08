// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from '../../adaptive-flow-renderer/events/FlowEvent.types';
import { EditorEventTypes } from '../events/EditorEventTypes';
import { NodeClicked, DialogLinkClicked } from '../../adaptive-flow-renderer/events';

export const mapFlowEventToEditorEvent = (
  flowEvent: FlowEvent
): { eventType: EditorEventTypes; eventData: any } | undefined => {
  if (flowEvent.eventType === FlowEventTypes.NodeClicked) {
    const e = flowEvent as NodeClicked;
    return {
      eventType: EditorEventTypes.Focus,
      eventData: { id: e.nodeId, tab: e.tabId },
    };
  }
  if (flowEvent.eventType === FlowEventTypes.DialogLinkClicked) {
    const e = flowEvent as DialogLinkClicked;
    return {
      eventType: EditorEventTypes.OpenDialog,
      eventData: {
        caller: e.nodeId,
        callee: e.calleeDialog,
      },
    };
  }
  return;
};
