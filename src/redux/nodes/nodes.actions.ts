import { IPosition } from "../../types";
import { IGraphNode, ISetNodeLocationResult } from "./nodes.types";

export const INIT_NODES = "INIT_NODES";
export const SET_NODES = "SET_NODES";
export const SET_NODE_POSITION = "SET_NODE_POSITION";
export const DRAG_NODES = "DRAG_NODES";

export const DRAG_NODE = "DRAG_NODE";
export const DROP_NODE = "DROP_NODE";

export function initNodes(nodes: IGraphNode[]) {
  const payload = { nodes };
  return { type: INIT_NODES, payload };
}

export function setNodes(nodes: IGraphNode[]) {
  const payload = { nodes };
  return { type: SET_NODES, payload };
}

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
