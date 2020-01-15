import { createReducer } from "../utils";
import { DRAG_NODES, DROP_NODE, SET_NODE_POSITION } from "./nodes.actions";
import { ISetNodeLocationResult } from "./nodes.types";

const INITIAL_STATE = {};

function nodePositionHandler(state: any, action: ISetNodeLocationResult) {
  const { nodeId, position } = action.payload;

  const newGraph = {
    ...state,
    [nodeId]: {
      ...state[nodeId],
      x: position.x,
      y: position.y,
    },
  };

  return newGraph;
}

function dragNodesHandler(state: any, action: any) {
  const { nodeIds, position } = action.payload;

  const nodes = nodeIds
    .filter((nodeId: string) => !!state[nodeId])
    .map((nodeId: string) => {
      let newX = state[nodeId].x + position.x;
      let newY = state[nodeId].y + position.y;

      // cap the node position to min values
      newX = newX < 0 ? 0 : newX;
      newY = newY < 0 ? 0 : newY;

      return ({
        ...state[nodeId],
        x: newX,
        y: newY,
      });
    })
    .reduce((acc: any, item: any) => {
      acc[`${item.id}`] = item;
      return acc;
    }, {});

  const newGraph = {
    ...state,
    ...nodes,
  };

  return newGraph;
}

const nodesReducer = createReducer(INITIAL_STATE, {
  [SET_NODE_POSITION]: nodePositionHandler,
  [DROP_NODE]: nodePositionHandler,
  [DRAG_NODES]: dragNodesHandler,
});

export default nodesReducer;
