import * as React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { setNodePosition } from "../../../../redux/nodes/nodes.actions";
import { IStoreState } from "../../../../redux/types";

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
  const editorId = useSelector((state: IStoreState) => state.references.editorId);

  return (
    <Draggable
      scale={zoom}
      bounds={`#${editorId}`}
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
