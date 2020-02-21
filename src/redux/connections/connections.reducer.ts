import { connectionsToMap, createReducer, makeConnectionId } from "../utils";
import { CREATE_CONNECTION, DELETE_CONNECTION, SET_CONNECTIONS, INIT_CONNECTIONS } from "./connections.actions";
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

function replaceConnectionsHandler(state: IConnectionsState, action: any): IConnectionsState {
  const { connections } = action.payload;
  return connectionsToMap(connections || []);
}

const connectionsReducer = createReducer(INITIAL_STATE, {
  [CREATE_CONNECTION]: createConnectionHandler,
  [DELETE_CONNECTION]: deleteConnectionHandler,
  [SET_CONNECTIONS]: replaceConnectionsHandler,
  [INIT_CONNECTIONS]: replaceConnectionsHandler,
});

export default connectionsReducer;
