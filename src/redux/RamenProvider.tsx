import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import connectionsReducer from "./connections/connections.reducer";
import editorReducer from "./editor/editor.reducer";
import nodesReducer from "./nodes/nodes.reducer";
import ramenMiddleware from "./ramenMiddleware";
import schemaReducer from "./schema/schema.reducer";
import viewportReducer from "./viewport/viewport.reducer";
import { makeConnectionId } from "./utils";

const rootReducer = combineReducers({
  editor: editorReducer,
  nodes: nodesReducer,
  viewport: viewportReducer,
  connections: connectionsReducer,
  schema: schemaReducer,
});

const middleware: any[] = [
  ramenMiddleware,
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

/** provider for the editor data */
class RamenProvider extends React.Component<any, any> {

  store: any;

  constructor(props: any) {
    super(props);

    const initialState = {
      nodes: arrayToMap(props.initialGraph.nodes),
      connections: connectionsToMap(props.initialGraph.connections),
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
