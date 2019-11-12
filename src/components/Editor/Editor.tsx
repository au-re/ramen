import * as React from "react";

import { IEditorProps, IGraph, IGraphNode } from "../../types";
import Background from "../Background/Background";
import Node from "../Node/Node";
import ZoomPan from "../ZoomPan/ZoomPan";

function Editor(props: IEditorProps) {
  const { editorHeight, editorWidth, graph, schema, onGraphChange = () => { } } = props;
  const { nodeTypes = {} } = schema;
  const filteredNodes = graph.nodes.filter((node) => !!nodeTypes[node.type]);

  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [nodes = [], setNodes] = React.useState(filteredNodes);

  /**
   * when dragging the node, update the node location in the editor state
   * updating the node location is necessary to rerender the noodles.
   * @param id
   * @param data
   */
  function updateNodeLocation(id: string, data: any) {
    const rest: IGraphNode[] = [];
    let node: IGraphNode;

    nodes.forEach((_node) => {
      if (_node.id === id) node = _node;
      else rest.push(_node);
    });

    const newNode = {
      ...node,
      x: data.x,
      y: data.y,
    };

    setNodes([newNode, ...rest]);
  }

  return (
    <ZoomPan
      minX={-editorHeight}
      minY={-editorWidth}
      minZoom={0.5}
      maxZoom={1.7}
      onScaleChange={setZoomLevel}
    >
      <Background id="GraphEditor" height={editorHeight} width={editorWidth}>
        {
          filteredNodes.map((node) => (
            <Node
              zoomLevel={zoomLevel}
              key={node.id}
              x={node.x}
              y={node.y}
              name={node.name}
              onDrag={(e: any, data: any) => updateNodeLocation(node.id, data)}
              onDrop={() => onGraphChange({ nodes, ...graph })}
            />
          ))
        }
      </Background>
    </ZoomPan>
  );
}

export default Editor;
