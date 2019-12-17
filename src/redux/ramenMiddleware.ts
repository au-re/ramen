import _ from "lodash";

import { SET_PENDING_CONNECTION_END_POS } from "./editor/editor.actions";
import { getPendingConnection } from "./editor/editor.selectors";
import { getViewportId } from "./references/references.selectors";
import { getViewport } from "./viewport/viewport.selectors";

/**
 * middleware
 *
 * @param {*} store
 */
const ramenMiddleware = (store: any) => (next: any) => {
  return (action: any) => {
    const type = _.get(action, "type", "");
    const storeState = store.getState();
    const viewport = document.getElementById(getViewportId(storeState));

    // update mouse position with viewport state
    if (type === SET_PENDING_CONNECTION_END_POS) {
      if (getPendingConnection(storeState)) {
        const { endPos } = action.payload;
        const viewportState = getViewport(storeState);
        const viewportRect = viewport.getBoundingClientRect();

        const newMousePos = {
          x: ((endPos.x - viewportRect.left - viewportState.xPos) / viewportState.zoom),
          y: ((endPos.y - viewportRect.top - viewportState.yPos) / viewportState.zoom),
        };

        const newAction = { ...action, payload: { endPos: newMousePos } };
        return next(newAction);
      }
    }

    return next(action);
  };
};

export default ramenMiddleware;
