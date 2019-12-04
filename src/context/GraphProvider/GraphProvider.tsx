import get from "lodash.get";
import * as React from "react";

import { FIELD_HEIGHT, NODE_HEADER_HEIGHT, NODE_WIDTH } from "../../constants";
import { IGraph, IGraphConnection, IGraphContext, IGraphNode, IGraphProviderProps, ILocation, ISchema } from "../../types";

export const GraphContext = React.createContext({} as IGraphContext);

const emptySchema: ISchema = {
  nodeTypes: {},
  fieldTypes: {},
};

const emptyGraph: IGraph = {
  nodes: [],
  connections: [],
};

function GraphProvider(props: IGraphProviderProps) {
  const { children, graph, initialGraph, schema = emptySchema, onGraphChange = () => { } } = props;

  const [_graph, _setGraph] = React.useState(initialGraph || graph || emptyGraph);

  const useControlled = !!graph || graph === null;

  React.useEffect(() => {
    if (useControlled) _setGraph(graph);
  }, [graph]);

  /** change the internal graph state
   * @param {*} newGraph
   */
  function setGraph(newGraph: IGraph) {
    const graphData = { ..._graph, ...newGraph };
    onGraphChange(graphData);
    if (!useControlled) _setGraph(newGraph);
  }

  /** when dragging the node, update the node location in the editor state
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

    setGraph(newGraph);
  }

  /** remove a connection
   * @param idx
   */
  function deleteConnection(idx: number) {
    const newConnections = _graph.connections.filter((_: any, _idx: number) => (_idx !== idx));
    const newGraph = { ..._graph, connections: newConnections };

    setGraph(newGraph);
  }

  /** create a connection between two fields
   * @param connection
   */
  function createConnection(connection: IGraphConnection) {
    const newGraph = { ..._graph, connections: [connection, ..._graph.connections] };
    // TODO: avoid dupplicate connections
    setGraph(newGraph);
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
      .findIndex((pin: any) => pin.id === connection.originField);

    if (!node || !nodeSchema || startPinIdx === -1) return null;

    const y = node.y + (startPinIdx * FIELD_HEIGHT) + NODE_HEADER_HEIGHT + (FIELD_HEIGHT / 2);
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
      .findIndex((pin: any) => pin.id === connection.targetField);

    if (!node || !nodeSchema || endPinIdx === -1) return null;

    const endPinTotalIdx = endPinIdx + get(nodeSchema, "fields.out.length", 0);
    const y = node.y + (endPinTotalIdx * FIELD_HEIGHT) + NODE_HEADER_HEIGHT + (FIELD_HEIGHT / 2);
    return { x: node.x, y };
  }

  const contextValues: IGraphContext = {
    graph: _graph,
    schema,
    setGraph,
    updateNodeLocation,
    createConnection,
    deleteConnection,
    getConnectionEnd,
    getConnectionStart,
  };

  return (
    <GraphContext.Provider value={contextValues}>
      {children}
    </GraphContext.Provider>
  );
}

export default GraphProvider;
