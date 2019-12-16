import * as React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { EDITOR_ID } from "../../../../constants";
import { setNodePosition } from "../../../../redux/nodes/nodes.actions";
import { IStoreState } from "../../../../redux/types";
import { IPosition } from "../../../../types";

const Wrap = styled.div`
  position: absolute;
  z-index: 100;
  cursor: move;
`;

function DragWrapper(props: any) {
  const { children, defaultX, defaultY, nodeId } = props;
  const defaultPos = { x: defaultX, y: defaultY };

  const dispatch = useDispatch();
  const zoom = useSelector((state: IStoreState) => state.viewport.zoom);

  return (
    <Draggable
      scale={zoom}
      bounds={`#${EDITOR_ID}`}
      position={defaultPos}
      cancel=".noDrag"
      onDrag={(e: any, { x, y }) => { dispatch(setNodePosition(nodeId, { x, y })); }}
      onStop={(e: any, { x, y }) => { dispatch(setNodePosition(nodeId, { x, y })); }}
    >
      <Wrap>
        {children}
      </Wrap>
    </Draggable>
  );
}

export default React.memo(DragWrapper, (prevProps, nextProps) => {
  return prevProps.defaultX === nextProps.defaultX
    && prevProps.defaultY === nextProps.defaultY
    && prevProps.nodeId === nextProps.nodeId;
});
