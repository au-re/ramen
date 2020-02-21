import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import undoable, { excludeAction, groupByActionTypes } from "redux-undo";

import connectionsReducer from "./connections/connections.reducer";
import nodesReducer from "./nodes/nodes.reducer";
import referencesReducer from "./references/references.reducer";
import editorReducer from "./editor/editor.reducer";
import viewportReducer from "./viewport/viewport.reducer";
import selectionReducer from "./selection/selection.reducer";
import schemaReducer from "./schema/schema.reducer";
import { INIT_NODES, DRAG_NODES, SET_NODES } from "./nodes/nodes.actions";
import { SET_SCHEMA } from "./schema/schema.actions";
import { SET_SELECTION } from "./selection/selection.actions";
import { SET_PENDING_CONNECTION_ORIGIN } from "./editor/editor.actions";
import { IRamenEvents } from "../types";
import eventsMiddleware from "./events.middleware";
import editorMiddleware from "./editor/editor.middleware";
import viewportMiddleware from "./viewport/viewport.middleware";
import connectionMiddleware from "./connections/connections.middleware";
import { INIT_CONNECTIONS, SET_CONNECTIONS } from "./connections/connections.actions";

const undoableReducers = combineReducers({
  connections: connectionsReducer,
  nodes: nodesReducer,
});

const rootReducer = combineReducers({
  references: referencesReducer,
  editor: editorReducer,
  viewport: viewportReducer,
  selection: selectionReducer,
  schema: schemaReducer,
  history: undoable(undoableReducers, {
    ignoreInitialState: true,
    groupBy: groupByActionTypes([SET_NODES, SET_CONNECTIONS]),
    filter: excludeAction([
      INIT_NODES,
      INIT_CONNECTIONS,
      DRAG_NODES,
      SET_SCHEMA,
      SET_SELECTION,
      SET_PENDING_CONNECTION_ORIGIN,
    ]),
  }),
});

function configureStore(preloadedState: any, events: IRamenEvents) {
  const middlewares = [
    connectionMiddleware,
    viewportMiddleware,
    editorMiddleware,
    eventsMiddleware(events),
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
  ];

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}

export default configureStore;
