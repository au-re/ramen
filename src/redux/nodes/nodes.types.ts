import { IPosition } from "../../types";

export interface INodesState {
  [nodeId: string]: IGraphNode;
}

export interface IGraphNode {
  id: string;
  x: number;
  y: number;
  name?: string;
  type: string;
}

export interface ISetNodeLocationResult {
  type: string;
  payload: {
    nodeId: string;
    position: IPosition;
  };
}
