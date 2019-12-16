import _ from "lodash";

import { VIEWPORT_ID } from "../constants";
import { CREATE_CONNECTION } from "./connections/connections.actions";
import { isValidConnection } from "./connections/connections.selectors";
import { SET_PENDING_CONNECTION_END_POS } from "./editor/editor.actions";
import { getPendingConnection } from "./editor/editor.selectors";
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
    const viewport = document.getElementById(VIEWPORT_ID);

    // validate connection attempt
    if (type === CREATE_CONNECTION) {
      if (isValidConnection(storeState, action.payload.connection)) {
        return next(action);
      }

      return;
    }

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
