import get from "lodash.get";
import * as React from "react";

import { IGraph, IGraphConnection, IGraphNode, ILocation, IRamenContext, IRamenProviderProps, ISchema } from "../../types";

// TODO: make these values editable
const NODE_WIDTH = 200;
const PIN_SPACING = 42;
const HEADER_SPACING = 52;

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
  const { initialGraph, graph = emptyGraph, schema = emptySchema, children } = props;
  const { onGraphChange = () => { } } = props;

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
    const graphData = { ..._graph, ...newGraph };
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

  /** remove a connection
   * @param idx
   */
  function deleteConnection(idx: number) {
    const newConnections = _graph.connections.filter((_, _idx: number) => (_idx !== idx));
    const newGraph = { ..._graph, connections: newConnections };

    onGraphChange(newGraph);
    _setGraph(newGraph);
  }

  /** create a connection between two pins
   * @param nodeId
   * @param pinId
   */
  function createConnection(connection: IGraphConnection) {
    const newGraph = { ..._graph, connections: [connection, ..._graph.connections] };
    // TODO: avoid dupplicate connections
    onGraphChange(newGraph);
    _setGraph(newGraph);
  }

  /** returns a node given a node id
   * @param nodeId
   */
  function getNode(nodeId: string) {
    return _graph.nodes.find((node: IGraphNode) => node.id === nodeId);
  }

  /** given a connection return the start of it in x, y coordinates
   * @param connection
   */
  function getConnectionStart(connection: IGraphConnection) {
    const node = getNode(connection.originNode);
    const nodeSchema = get(schema, `nodeTypes[${get(node, "type")}]`);
    const startPinIdx = get(nodeSchema, "fields.out", [])
      .findIndex((pin: any) => pin.id === connection.originPin);

    if (!node || !nodeSchema || startPinIdx === -1) return null;

    const y = node.y + (startPinIdx * PIN_SPACING) + HEADER_SPACING + (PIN_SPACING / 2);
    const x = node.x + NODE_WIDTH;
    return { x, y };
  }

  /** given a connection return the end of it in x, y coordinates
   * @param connection
   */
  function getConnectionEnd(connection: IGraphConnection) {
    const node = getNode(connection.targetNode);
    const nodeSchema = get(schema, `nodeTypes[${get(node, "type")}]`);
    const endPinIdx = get(nodeSchema, "fields.in", [])
      .findIndex((pin: any) => pin.id === connection.targetPin);

    if (!node || !nodeSchema || endPinIdx === -1) return null;

    const endPinTotalIdx = endPinIdx + get(nodeSchema, "fields.out.length", 0);
    const y = node.y + (endPinTotalIdx * PIN_SPACING) + HEADER_SPACING + (PIN_SPACING / 2);
    return { x: node.x, y };
  }

  const contextValue: IRamenContext = {
    graph: _graph,
    schema,
    setGraph,
    setZoomLevel,
    updateNodeLocation,
    deleteConnection,
    createConnection,
    getConnectionStart,
    getConnectionEnd,
  };

  return (
    <RamenContext.Provider value={contextValue}>
      {children}
    </RamenContext.Provider>
  );
}

export default RamenProvider;
