import get from "lodash.get";

import { IRamenEvents } from "../../types";
import { getViewportId } from "../references/references.selectors";
import { IStoreState } from "../types";
import { getViewport } from "../viewport/viewport.selectors";
import { SET_PENDING_CONNECTION_END_POS, SET_PENDING_CONNECTION_ORIGIN } from "./editor.actions";
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
const editorMiddleware = (events: IRamenEvents) => (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");
  const storeState = store.getState();

  // update dragged noodle end pos with viewport state
  if (type === SET_PENDING_CONNECTION_END_POS) {
    if (getPendingConnection(storeState)) {

      // refocus on the viewport, this solves issues with undo/redo
      const viewport = document.getElementById(getViewportId(storeState));
      if (viewport) viewport.focus();
      //

      return next(transformMoveAction(storeState, action));
    }
  }

  // refocus on the viewport, this solves issues with undo/redo
  if (type === SET_PENDING_CONNECTION_ORIGIN) {
    const viewport = document.getElementById(getViewportId(storeState));
    if (viewport) viewport.focus();
  }

  return next(action);
};

export default editorMiddleware;
