import { createReducer, makeConnectionId } from "../utils";
import { CREATE_CONNECTION, DELETE_CONNECTION } from "./connections.actions";
import { IConnectionsState } from "./connections.types";

const INITIAL_STATE: IConnectionsState = {};

function createConnectionHandler(state: IConnectionsState, action: any): IConnectionsState {
  const { connection } = action.payload;
  return {
    ...state,
    [makeConnectionId(connection)]: connection,
  };
}

function deleteConnectionHandler(state: IConnectionsState, action: any): IConnectionsState {
  const { connectionId } = action.payload;
  const { [connectionId]: value, ...rest } = state;
  return { ...rest };
}

const connectionsReducer = createReducer(INITIAL_STATE, {
  [CREATE_CONNECTION]: createConnectionHandler,
  [DELETE_CONNECTION]: deleteConnectionHandler,
});

export default connectionsReducer;
