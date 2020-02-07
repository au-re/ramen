import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import undoable, { excludeAction } from "redux-undo";

import { BASE_EDITOR_ID, BASE_VIEWPORT_ID } from "../constants";
import { IRamenEvents } from "../types";
import { setConnections } from "./connections/connections.actions";
import connectionMiddleware from "./connections/connections.middleware";
import connectionsReducer from "./connections/connections.reducer";
import editorMiddleware from "./editor/editor.middleware";
import editorReducer from "./editor/editor.reducer";
import eventsMiddleware from "./events.middleware";
import { DRAG_NODES, setNodes } from "./nodes/nodes.actions";
import nodesReducer from "./nodes/nodes.reducer";
import referencesReducer from "./references/references.reducer";
import { setSchema } from "./schema/schema.actions";
import schemaReducer from "./schema/schema.reducer";
import selectionReducer from "./selection/selection.reducer";
import { arrayToMap, connectionsToMap } from "./utils";
import viewportMiddleware from "./viewport/viewport.middleware";
import viewportReducer from "./viewport/viewport.reducer";

let namespace = 0;

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
    filter: excludeAction(DRAG_NODES),
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

/** The ramen provider encapsulates the store provider
 * @param props
 */
function RamenProvider(props: any) {
  const { initialGraph = {}, graph, initialEditorState, schema, children } = props;
  const { onConnectionCreate, onConnectionDelete, onGraphChange, onNodePositionChange, onSelection } = props;
  const [store, setStore] = React.useState(null);

  // on load, initialize a new store with a namespace
  // the namespace is used to differentiate between editor instances
  // this is necessary in order to have multiple editors in the same page
  React.useEffect(() => {

    namespace = namespace + 1;

    const references = {
      editorId: `${BASE_EDITOR_ID}-${namespace}`,
      viewportId: `${BASE_VIEWPORT_ID}-${namespace}`,
    };

    const presentState = {
      nodes: arrayToMap((initialGraph || graph).nodes || []),
      connections: connectionsToMap((initialGraph || graph).connections || []),
    };

    const history = {
      past: [] as any[],
      present: presentState,
      future: [] as any[],
    };

    const initialState = {
      selection: {},
      editor: initialEditorState,
      schema,
      references,
      history,
    };

    const events = {
      onGraphChange,
      onConnectionCreate,
      onConnectionDelete,
      onNodePositionChange,
      onSelection,
    };

    const store = configureStore(initialState, events);

    setStore(store);
  }, []);

  // if the schema property changes, update the graph
  React.useEffect(() => {
    if (!store) return;
    store.dispatch(setSchema(schema));
  }, [store, schema]);

  // if the graph property changes, update the graph
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
