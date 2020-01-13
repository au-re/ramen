import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import undoable, { excludeAction, groupByActionTypes } from "redux-undo";

import { BASE_EDITOR_ID, BASE_VIEWPORT_ID } from "../constants";
import connectionMiddleware from "./connections/connections.middleware";
import connectionsReducer from "./connections/connections.reducer";
import editorMiddleware from "./editor/editor.middleware";
import editorReducer from "./editor/editor.reducer";
import { DROP_NODE, SET_NODE_POSITION } from "./nodes/nodes.actions";
import nodesReducer from "./nodes/nodes.reducer";
import referencesReducer from "./references/references.reducer";
import { setSchema } from "./schema/schema.actions";
import schemaReducer from "./schema/schema.reducer";
import { arrayToMap, connectionsToMap } from "./utils";
import viewportMiddleware from "./viewport/viewport.middleware";
import viewportReducer from "./viewport/viewport.reducer";

const rootReducer = combineReducers({
  references: referencesReducer,
  editor: editorReducer,
  history: undoable(combineReducers({
    connections: connectionsReducer,
    nodes: nodesReducer,
  }), {
      filter: excludeAction(SET_NODE_POSITION),
    }),
  viewport: viewportReducer,
  schema: schemaReducer,
});

const middleware: any[] = [
  connectionMiddleware,
  viewportMiddleware,
  editorMiddleware,
];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let namespace = 0;

function RamenProvider(props: any) {
  const { initialGraph, initialEditorState, schema, children } = props;

  namespace = namespace + 1;

  const initialState = {
    references: {
      editorId: `${BASE_EDITOR_ID}-${namespace}`,
      viewportId: `${BASE_VIEWPORT_ID}-${namespace}`,
    },
    history: {
      past: [] as any[],
      present: {
        nodes: arrayToMap(initialGraph.nodes || []),
        connections: connectionsToMap(initialGraph.connections || []),
      },
      future: [] as any[],
    },
    editor: initialEditorState,
    schema,
  };

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  React.useEffect(() => {
    store.dispatch(setSchema(schema));
  }, [schema]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default RamenProvider;
