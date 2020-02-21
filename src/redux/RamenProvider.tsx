import React from "react";
import { Provider } from "react-redux";

import { BASE_EDITOR_ID, BASE_VIEWPORT_ID } from "../constants";
import { initConnections, setConnections } from "./connections/connections.actions";
import { initNodes, setNodes } from "./nodes/nodes.actions";
import { setSchema } from "./schema/schema.actions";
import { arrayToMap, connectionsToMap } from "./utils";
import configureStore from "./store";
import { getNodes } from "./nodes/nodes.selectors";
import { getConnections } from "./connections/connections.selectors";

let namespace = 0;

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
    store.dispatch(initNodes(graph.nodes));
    store.dispatch(initConnections(graph.connections));
  }, [store, graph]);

  //
  // create an action on first load to avoid user undoing to empty state
  React.useEffect(() => {
    if (!store) return;
    store.dispatch(setNodes(getNodes(store.getState())));
    store.dispatch(setConnections(getConnections(store.getState())));
  }, [store]);

  if (!store) return null;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default RamenProvider;
