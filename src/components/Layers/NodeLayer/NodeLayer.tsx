import React from "react";
import Draggable from "react-draggable";

import { RamenContext } from "../../../context/RamenContext/RamenContext";
import { IGraphNode, ILocation } from "../../../types";
import NodeContainer from "../../Node/NodeContainer";

function NodeLayer(props: any) {
  const { onNodeDrop, onNodeDrag, onFieldOutMouseDown, onFieldInMouseUp } = props;
  const { graph } = React.useContext(RamenContext);
  const { nodes, zoom } = graph;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {
        nodes.map((node: IGraphNode) => (
          <Draggable
            key={node.id}
            scale={zoom}
            bounds="#GraphEditor"
            defaultPosition={{ x: node.x, y: node.y }}
            cancel=".noDrag"
            onDrag={(e: any, location: ILocation) => onNodeDrag(node.id, location)}
            onStop={(e: any, location: ILocation) => onNodeDrop(node.id, location)}
          >
            <NodeContainer
              node={node}
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
