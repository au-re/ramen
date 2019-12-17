import get from "lodash.get";

import { getViewportId } from "../references/references.selectors";
import { IStoreState } from "../types";
import { getViewport } from "../viewport/viewport.selectors";
import { SET_PENDING_CONNECTION_END_POS } from "./editor.actions";
import { getPendingConnection } from "./editor.selectors";

/** when a noodle is dragged, calculate its end position based on the current viewport state
 *
 * @param state
 * @param action
 */
function transformMoveAction(state: IStoreState, action: any) {
  const viewport = document.getElementById(getViewportId(state));
  const { endPos } = action.payload;
  const viewportState = getViewport(state);
  const viewportRect = viewport.getBoundingClientRect();

  const newMousePos = {
    x: ((endPos.x - viewportRect.left - viewportState.xPos) / viewportState.zoom),
    y: ((endPos.y - viewportRect.top - viewportState.yPos) / viewportState.zoom),
  };

  const newAction = { ...action, payload: { endPos: newMousePos } };
  return newAction;
}

/**
 * middleware
 *
 * @param {*} store
 */
const editorMiddleware = (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");
  const storeState = store.getState();

  // update dragged noodle end pos with viewport state
  if (type === SET_PENDING_CONNECTION_END_POS) {
    if (getPendingConnection(storeState)) {
      return next(transformMoveAction(storeState, action));
    }
  }

  return next(action);
};

export default editorMiddleware;
