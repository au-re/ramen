import get from "lodash.get";

import { ActionCreators } from "redux-undo";

import { IRamenEvents } from "../types";
import { CREATE_CONNECTION, DELETE_CONNECTION } from "./connections/connections.actions";
import { getConnectionById, getConnections, isValidConnection } from "./connections/connections.selectors";
import { DROP_NODE } from "./nodes/nodes.actions";
import { getNodes } from "./nodes/nodes.selectors";

/**
 * event middleware to notify consumers of Ramen about state changes
 * @param events
 */
const eventsMiddleware = (events: IRamenEvents) => (store: any) => (next: any) => (action: any) => {
  const type = get(action, "type", "");

  if (type === DELETE_CONNECTION) {
    events.onConnectionDelete(getConnectionById(store.getState(), action.payload.connectionId));
  }

  // first, update the store, then trigger the events
  next(action);

  const storeState = store.getState();

  if (type === CREATE_CONNECTION) {
    if (isValidConnection(storeState, action.payload.connection)) {
      events.onConnectionCreate(action.payload.connection);
    }
  }

  if (type === DROP_NODE) {
    events.onNodePositionChange(action.payload.nodeId, action.payload.position);
  }

  if (
    type === CREATE_CONNECTION ||
    type === DELETE_CONNECTION ||
    type === ActionCreators.undo() ||
    type === ActionCreators.redo() ||
    type === DROP_NODE
  ) {
    events.onGraphChange({
      nodes: getNodes(storeState),
      connections: getConnections(storeState),
    });
  }
};

export default eventsMiddleware;
