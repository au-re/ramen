import { createReducer } from "../utils";
import { SET_NODE_POSITION } from "./nodes.actions";
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

const nodesReducer = createReducer(INITIAL_STATE, {
  [SET_NODE_POSITION]: nodePositionHandler,
});

export default nodesReducer;
