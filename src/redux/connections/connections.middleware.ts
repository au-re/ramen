import get from "lodash.get";
import { IRamenEvents } from "../../types";
import { getNodes } from "../nodes/nodes.selectors";
import { getViewportId } from "../references/references.selectors";
import { CREATE_CONNECTION, DELETE_CONNECTION } from "./connections.actions";
import { getConnections, isValidConnection } from "./connections.selectors";

/**
 * middleware
 *
 * @param {*} store
 */
const connectionMiddleware = (callbacks: IRamenEvents) => (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");
  const storeState = store.getState();

  // validate connection attempt
  if (type === CREATE_CONNECTION) {
    if (isValidConnection(storeState, action.payload.connection)) {
      callbacks.onConnectionCreate(action.payload.connection);
      callbacks.onGraphChange({
        nodes: getNodes(storeState),
        connections: getConnections(storeState),
      });
      return next(action);
    }
    return;
  }

  if (type === DELETE_CONNECTION) {
    callbacks.onConnectionDelete(action.payload.connectionId);
    callbacks.onGraphChange({
      nodes: getNodes(storeState),
      connections: getConnections(storeState),
    });

    // refocus on the viewport, this solves issues with undo/redo
    document.getElementById(getViewportId(storeState)).focus();
  }

  return next(action);
};

export default connectionMiddleware;
