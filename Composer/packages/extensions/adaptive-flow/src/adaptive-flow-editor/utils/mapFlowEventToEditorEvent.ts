// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FlowEvent, FlowEventTypes } from '../../adaptive-flow-renderer/events/FlowEvent.types';
import { EditorEventTypes } from '../events/EditorEventTypes';
import { NodeClicked, DialogLinkClicked, NodeMenuClicked, EdgeMenuClicked } from '../../adaptive-flow-renderer/events';
import { NodeMenuKeys } from '../renderers/NodeMenu';

export const mapFlowEventToEditorEvent = (
  flowEvent: FlowEvent
): { eventType: EditorEventTypes; eventData: any } | undefined => {
  if (flowEvent.eventType === FlowEventTypes.NodeClicked) {
    const { nodeId, tabId } = flowEvent as NodeClicked;
    return {
      eventType: EditorEventTypes.Focus,
      eventData: { id: nodeId, tab: tabId },
    };
  }

  if (flowEvent.eventType === FlowEventTypes.DialogLinkClicked) {
    const { nodeId, calleeDialog } = flowEvent as DialogLinkClicked;
    return {
      eventType: EditorEventTypes.OpenDialog,
      eventData: {
        caller: nodeId,
        callee: calleeDialog,
      },
    };
  }
  if (flowEvent.eventType === FlowEventTypes.NodeMenuClicked) {
    const { nodeId, menuKey } = flowEvent as NodeMenuClicked;
    if (menuKey === NodeMenuKeys.DELETE) {
      return {
        eventType: EditorEventTypes.Delete,
        eventData: { id: nodeId },
      };
    }
  }

  if (flowEvent.eventType === FlowEventTypes.EdgeMenuClicked) {
    const { arrayPath, arrayPosition, menuKey } = flowEvent as EdgeMenuClicked;
    return {
      eventType: EditorEventTypes.Insert,
      eventData: {
        id: arrayPath,
        position: arrayPosition,
        $kind: menuKey,
      },
    };
  }

  return;
};
