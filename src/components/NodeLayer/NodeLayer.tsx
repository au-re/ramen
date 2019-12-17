import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { getNodes } from "../../redux/nodes/nodes.selectors";
import DefaultNode from "./components/DefaultNode/DefaultNode";
import DragWrapper from "./components/DragWrapper/DragWrapper";

function NodeLayer(props: any) {
  const nodes = useSelector(getNodes, shallowEqual);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {
        nodes.map((node) => (
          <DragWrapper
            key={node.id}
            nodeId={node.id}
            defaultX={node.x}
            defaultY={node.y}
          >
            <DefaultNode
              nodeId={node.id}
              name={node.name}
              type={node.type}
              controls={props.controls}
            />
          </DragWrapper>
        ))
      }
    </div>
  );
}

export default NodeLayer;
