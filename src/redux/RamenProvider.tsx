import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import { BASE_EDITOR_ID, BASE_VIEWPORT_ID } from "../constants";
import connectionMiddleware from "./connections/connections.middleware";
import connectionsReducer from "./connections/connections.reducer";
import editorMiddleware from "./editor/editor.middleware";
import editorReducer from "./editor/editor.reducer";
import nodesReducer from "./nodes/nodes.reducer";
import referencesReducer from "./references/references.reducer";
import schemaReducer from "./schema/schema.reducer";
import { makeConnectionId } from "./utils";
import viewportMiddleware from "./viewport/viewport.middleware";
import viewportReducer from "./viewport/viewport.reducer";

const rootReducer = combineReducers({
  references: referencesReducer,
  editor: editorReducer,
  nodes: nodesReducer,
  viewport: viewportReducer,
  connections: connectionsReducer,
  schema: schemaReducer,
});

const middleware: any[] = [
  connectionMiddleware,
  viewportMiddleware,
  editorMiddleware,
];

function arrayToMap(array: any[]) {
  const map = array.reduce((map, item, idx) => {
    const { id } = item;
    const newItem = { ...item };
    newItem.idx = idx;
    map[id || idx] = newItem;
    return map;
  }, {});
  return map;
}

function connectionsToMap(array: any[]) {
  const map = array.reduce((map, item, idx) => {
    const id = makeConnectionId(item);
    const newItem = { ...item };
    map[id] = newItem;
    return map;
  }, {});
  return map;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let namespace = 0;

/** provider for the editor data */
class RamenProvider extends React.Component<any, any> {

  store: any;

  constructor(props: any) {
    super(props);

    namespace = namespace + 1;

    const initialState = {
      references: {
        editorId: `${BASE_EDITOR_ID}-${namespace}`,
        viewportId: `${BASE_VIEWPORT_ID}-${namespace}`,
      },
      nodes: arrayToMap(props.initialGraph.nodes || []),
      connections: connectionsToMap(props.initialGraph.connections || []),
      editor: props.initialEditorState,
      schema: props.schema,
    };

    this.store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middleware)),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default RamenProvider;
