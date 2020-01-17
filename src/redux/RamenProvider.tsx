import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import undoable, { excludeAction } from "redux-undo";

import { BASE_EDITOR_ID, BASE_VIEWPORT_ID } from "../constants";
import { setConnections } from "./connections/connections.actions";
import connectionMiddleware from "./connections/connections.middleware";
import connectionsReducer from "./connections/connections.reducer";
import { getConnections } from "./connections/connections.selectors";
import editorMiddleware from "./editor/editor.middleware";
import editorReducer from "./editor/editor.reducer";
import { DRAG_NODES, setNodes } from "./nodes/nodes.actions";
import nodesReducer from "./nodes/nodes.reducer";
import { getNodes } from "./nodes/nodes.selectors";
import referencesReducer from "./references/references.reducer";
import { setSchema } from "./schema/schema.actions";
import schemaReducer from "./schema/schema.reducer";
import selectionReducer from "./selection/selection.reducer";
import { arrayToMap, connectionsToMap } from "./utils";
import viewportMiddleware from "./viewport/viewport.middleware";
import viewportReducer from "./viewport/viewport.reducer";
import { isEqual } from "lodash";

const rootReducer = combineReducers({
  references: referencesReducer,
  editor: editorReducer,
  history: undoable(combineReducers({
    connections: connectionsReducer,
    nodes: nodesReducer,
  }), {
      filter: excludeAction(DRAG_NODES),
    }),
  viewport: viewportReducer,
  selection: selectionReducer,
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
  const { initialGraph = {}, graph, initialEditorState, schema, children, onGraphChange } = props;
  const [store, setStore] = React.useState(null);
  const [graphState, setGraphState] = React.useState(null);

  React.useEffect(() => {

    namespace = namespace + 1;

    const initialState = {
      references: {
        editorId: `${BASE_EDITOR_ID}-${namespace}`,
        viewportId: `${BASE_VIEWPORT_ID}-${namespace}`,
      },
      history: {
        past: [] as any[],
        present: {
          nodes: arrayToMap((initialGraph || graph).nodes || []),
          connections: connectionsToMap((initialGraph || graph).connections || []),
        },
        future: [] as any[],
      },
      selection: {},
      editor: initialEditorState,
      schema,
    };

    const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middleware)),
    );

    store.subscribe(() => {
      // this is very inefficient, it is called even on unrelated updates such as
      // dragging a noodle, zooming, panning
      const state = store.getState();
      onGraphChange({
        nodes: getNodes(state as any),
        connections: getConnections(state as any),
      });
    });

    setStore(store);
  }, []);

  React.useEffect(() => {
    if (!store) return;
    store.dispatch(setSchema(schema));
  }, [store, schema]);

  React.useEffect(() => {
    if (!store || !graph) return;
    store.dispatch(setNodes(graph.nodes));
    store.dispatch(setConnections(graph.connections));
  }, [store, graph]);

  if (!store) return null;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default RamenProvider;
