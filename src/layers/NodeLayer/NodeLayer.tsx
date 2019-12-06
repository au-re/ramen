import React from "react";
import Draggable from "react-draggable";

import { EDITOR_ID } from "../../constants";
import { EditorContext } from "../../context/EditorProvider/EditorProvider";
import { GraphContext } from "../../context/GraphProvider/GraphProvider";
import { IGraphNode, ILocation } from "../../types";
import Node from "./components/Node/Node";

function NodeLayer(props: any) {
  const { onNodeDrop, onNodeDrag, onFieldOutMouseDown, onFieldInMouseUp, controls } = props;

  const { graph, schema } = React.useContext(GraphContext);
  const { zoom } = React.useContext(EditorContext);
  const { nodes } = graph;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {
        nodes.map((node: IGraphNode) => (
          <Draggable
            key={node.id}
            scale={zoom}
            bounds={`#${EDITOR_ID}`}
            defaultPosition={{ x: node.x, y: node.y }}
            cancel=".noDrag"
            onDrag={(e: any, location: ILocation) => onNodeDrag(node.id, location)}
            onStop={(e: any, location: ILocation) => onNodeDrop(node.id, location)}
          >
            <Node
              id={node.id}
              name={node.name}
              type={node.type}
              controls={controls}
              schema={schema}
              onFieldOutMouseDown={onFieldOutMouseDown}
              onFieldInMouseUp={onFieldInMouseUp}
            />
          </Draggable>
        ))
      }
    </div>
  );
}

export default NodeLayer;
