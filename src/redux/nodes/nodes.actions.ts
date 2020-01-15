import { IPosition } from "../../types";
import { ISetNodeLocationResult } from "./nodes.types";

export const SET_NODE_POSITION = "SET_NODE_POSITION";
export const DRAG_NODES = "DRAG_NODES";

export const DRAG_NODE = "DRAG_NODE";
export const DROP_NODE = "DROP_NODE";

export function dragNodes(nodeIds: string[], position: IPosition) {
  const payload = { nodeIds, position };
  return { type: DRAG_NODES, payload };
}

export function setNodePosition(nodeId: string, position: IPosition): ISetNodeLocationResult {
  const payload = { nodeId, position };
  return { type: SET_NODE_POSITION, payload };
}

// this function is used to delimitate different nodes being dragged
export function dropNode(nodeId: string, position: IPosition): ISetNodeLocationResult {
  const payload = { nodeId, position };
  return { type: DROP_NODE, payload };
}
