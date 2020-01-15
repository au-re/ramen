import { IGraphConnectionOrigin } from "../connections/connections.types";

export const SET_PENDING_CONNECTION_END_POS = "SET_PENDING_CONNECTION_END_POS";
export const SET_PENDING_CONNECTION_ORIGIN = "SET_PENDING_CONNECTION_ORIGIN";

export const START_DRAGGING_NODE = "START_DRAGGING_NODE";
export const STOP_DRAGGING_NODE = "STOP_DRAGGING_NODE";

export function setPendingConnectionEndPos(endPos: any) {
  const payload = { endPos };
  return { type: SET_PENDING_CONNECTION_END_POS, payload };
}

export function setPendingConnectionOrigin(connectionOrigin: IGraphConnectionOrigin) {
  const payload = { connectionOrigin };
  return { type: SET_PENDING_CONNECTION_ORIGIN, payload };
}

export function startDraggingNode() {
  return { type: START_DRAGGING_NODE };
}

export function stopDraggingNode() {
  return { type: STOP_DRAGGING_NODE };
}
