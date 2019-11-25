import * as React from "react";

import { IGraph, IGraphNode, ILocation, IRamenContext, IRamenProviderProps, ISchema } from "../../types";

export const RamenContext = React.createContext({} as IRamenContext);

const emptySchema: ISchema = {
  nodeTypes: {},
  socketTypes: {},
};

const emptyGraph: IGraph = {
  nodes: [],
  connections: [],
};

/**
 * Provides the state of the editor through a context.
 * Provides helper functions to update the graph state.
 *
 * @param {*} props
 */
function RamenProvider(props: IRamenProviderProps) {
  const { initialGraph, graph = emptyGraph, schema = emptySchema } = props;
  const { editorHeight = 0, editorWidth = 0, onGraphChange = () => { } } = props;

  const [_graph, _setGraph] = React.useState(initialGraph || graph);

  const useControlled = !!graph || graph === null;

  // filter all nodes with undefined types
  React.useEffect(() => {
    const g = initialGraph || graph;
    const { nodeTypes = {} } = schema;
    const filteredNodes = g.nodes.filter((node: any) => !!nodeTypes[node.type]);
    _setGraph({ ..._graph, nodes: filteredNodes });
  }, [initialGraph, graph]);

  //
  React.useEffect(() => {
    if (useControlled) setGraph(graph);
  }, [graph]);

  /** callback used to change the graph structure
   * @param {*} newGraph
   */
  function setGraph(newGraph: IGraph) {
    const graphData = { _graph, ...newGraph };
    onGraphChange(graphData);
    if (!useControlled) {
      _setGraph(newGraph);
    }
  }

  /** callback used to change the zoom level
   * @param {*} newZoomLevel
   */
  function setZoomLevel(newZoomLevel: number) {
    const graphData = { ..._graph, zoom: newZoomLevel };
    onGraphChange(graphData);
    _setGraph(graphData);
  }

  /**
   * when dragging the node, update the node location in the editor state
   * updating the node location is necessary to rerender the noodles.
   * @param id
   * @param data
   */
  function updateNodeLocation(id: string, location: ILocation) {
    const rest: IGraphNode[] = [];
    let node: IGraphNode;

    _graph.nodes.forEach((_node) => {
      if (_node.id === id) node = _node;
      else rest.push(_node);
    });

    const newNode = { ...node, x: location.x, y: location.y };
    const newGraph = { ..._graph, nodes: [newNode, ...rest] };

    onGraphChange(newGraph);
    _setGraph(newGraph);
  }

  const contextValue: IRamenContext = {
    graph: _graph,
    schema,
    editorHeight,
    editorWidth,
    setGraph,
    setZoomLevel,
    updateNodeLocation,
  };

  return (
    <RamenContext.Provider value={contextValue}>
      {props.children}
    </RamenContext.Provider>
  );
}

export default RamenProvider;
