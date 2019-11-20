import * as React from "react";

export const RamenContext = React.createContext({});

/**
 * Provides the state of the editor through a context.
 * Provides helper functions to update the graph state.
 *
 * @param {*} props
 */
function RamenProvider(props) {
  const { initialGraph, graph, schema, editorHeight, editorWidth, zoomLevel = 1 } = props;

  const [_graph, _setGraph] = React.useState(initialGraph || graph);
  const [_zoomLevel, _setZoomLevel] = React.useState(zoomLevel);

  const useControlled = !!graph || graph === null;

  React.useEffect(() => {
    if (useControlled) setGraph(graph);
  }, [graph]);

  /**
   *
   * @param {*} newGraph
   */
  function setGraph(newGraph) {
    const graphData = { zoom, xPos, yPos, ...newGraph };
    onGraphChange(graphData);
    if (!useControlled) {
      _setGraph(newGraph);
    }
  }

  function setZoomLevel(newZoomLevel) {
    const graphData = { zoom: newZoomLevel, xPos, yPos, ..._graph };
    onGraphChange(graphData);
    _setZoomLevel(newZoomLevel)
  }

  const contextValue = {
    graph: _graph,
    schema,
    editorHeight,
    editorWidth,
    zoom: _zoomLevel,
    xPos: _xPos,
    yPos: _yPos,
    setGraph,
    setZoomLevel,
  };

  return (
    <RamenContext.Provider value={contextValue}>
      {props.children}
    </RamenContext.Provider>);
}

export default RamenProvider;
