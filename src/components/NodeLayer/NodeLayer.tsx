import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { dropNode, setNodePosition, dragNodes } from "../../redux/nodes/nodes.actions";
import { getNodes } from "../../redux/nodes/nodes.selectors";
import { getSelection } from "../../redux/selection/selection.selectors";
import { IPosition } from "../../types";
import DefaultNode from "./components/DefaultNode/DefaultNode";
import DragWrapper from "./components/DragWrapper/DragWrapper";

function NodeLayer(props: any) {
  const nodes = useSelector(getNodes, shallowEqual);
  const selection = useSelector(getSelection, shallowEqual);
  const dispatch = useDispatch();

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {
        nodes.map((node) => (
          <DragWrapper
            selected={selection[`${node.id}`]}
            key={node.id}
            nodeId={node.id}
            defaultX={node.x}
            defaultY={node.y}
            onDrag={(e: any, { deltaX, deltaY }: any) => { dispatch(dragNodes(Object.keys(selection), { x: deltaX, y: deltaY })); }}
            onStop={(e: any, { x, y }: IPosition) => { dispatch(dropNode(node.id, { x, y })); }}
          >
            <DefaultNode
              selected={selection[`${node.id}`]}
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
