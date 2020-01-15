import * as React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { dropNode, setNodePosition } from "../../../../redux/nodes/nodes.actions";
import { getEditorId } from "../../../../redux/references/references.selectors";
import { getViewportZoom } from "../../../../redux/viewport/viewport.selectors";
import { IPosition } from "../../../../types";

const Wrap: any = styled.div`
  position: absolute;
  z-index: ${(props: any) => props.selected ? 120 : 100};
  cursor: move;
`;

function DragWrapper(props: any) {
  const { children, defaultX, defaultY, selected, onDrag, onStop } = props;
  const defaultPos = { x: defaultX, y: defaultY };

  const dispatch = useDispatch();
  const zoom = useSelector(getViewportZoom);
  const editorId = useSelector(getEditorId);

  return (
    <Draggable
      scale={zoom}
      bounds={`#${editorId}`}
      position={defaultPos}
      cancel=".noDrag"
      onDrag={onDrag}
      onStop={onStop}
    >
      <Wrap selected={selected}>
        {children}
      </Wrap>
    </Draggable>
  );
}

export default React.memo(DragWrapper, (prevProps, nextProps) => {
  return prevProps.defaultX === nextProps.defaultX
    && prevProps.defaultY === nextProps.defaultY
    && prevProps.nodeId === nextProps.nodeId
    && prevProps.selected === nextProps.selected;
});
