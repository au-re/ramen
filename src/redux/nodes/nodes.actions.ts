import { IPosition } from "../../types";
import { ISetNodeLocationResult } from "./nodes.types";

export const SET_NODE_POSITION = "SET_NODE_POSITION";

export function setNodePosition(nodeId: string, position: IPosition): ISetNodeLocationResult {
  const payload = { nodeId, position };
  return { type: SET_NODE_POSITION, payload };
}
