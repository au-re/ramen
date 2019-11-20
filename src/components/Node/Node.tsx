import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import { lightTheme } from "../../themes";
import { IGraphNodeProps } from "../../types";

const NodeContainer: any = styled.div`
  z-index: 100;
  position: absolute;
  display: inline-block;
  width: ${(props: IGraphNodeProps) => props.width}px;
  color: ${({ theme }) => theme.textColor || lightTheme.textColor};
  background: ${({ theme }) => theme.nodeBackground || lightTheme.nodeBackground};
  border-radius: ${({ theme }) => theme.borderRadius || lightTheme.borderRadius};
  min-height: 108px;
  display: inline-block;
  cursor: move;
  border: ${({ theme }) => theme.borderWidth || lightTheme.borderWidth} solid ${({ theme }) => theme.borderColor || lightTheme.borderColor};
`;

const NodeTitle = styled.div`
  padding: .5rem .8rem;
  height: 36px;
`;

function Node(props: IGraphNodeProps) {
  const { children, x = 0, y = 0, width = 200, name, zoomLevel = 1 } = props;
  const { onDrop = () => { }, onDrag = () => { } } = props;

  return (
    <Draggable
      scale={zoomLevel}
      bounds="#GraphEditor"
      defaultPosition={{ x, y }}
      cancel=".noDrag"
      onDrag={onDrag}
      onStop={onDrop}
    >
      <NodeContainer width={width}>
        <NodeTitle>
          {name}
        </NodeTitle>
        <div>
          {children}
        </div>
      </NodeContainer>
    </Draggable>
  );
}

export default Node;
