import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const Pin: any = styled.div`
  height: ${(props: any) => `${props.radius * 2}px`};
  width: ${(props: any) => `${props.radius * 2}px`};
  border-radius: ${(props: any) => `${props.radius * 2}px`};
  border: 2px solid ${theme.borderColor};
  background: #2D9CDB;
  align-self: center;
`;

const Background: any = styled.div`
  height: ${(props: any) => props.height}px;
  display: flex;
  justify-content: ${(props: any) => (props.hasInput ? "flex-start" : "flex-end")};
  transform: translate(${(props: any) => (props.hasInput ? -1 * props.radius : props.radius)}px);
  line-height: 32px;
  cursor: pointer;
  color: #96A1A9;
`;

function Field(props: any) {
  const { hasInput, hasOutput, children, height } = props;
  const { onMouseUp = () => { }, onMouseDown = () => { } } = props;

  const handleMouseDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onMouseDown();
  };

  return (
    <Background
      height={height}
      hasInput={hasInput}
      onMouseUp={onMouseUp}
      radius={8}
    >
      {hasInput && <Pin className="noDrag" radius={8} onMouseDown={handleMouseDown} />}
      <div style={{ padding: "0 .5rem" }} onMouseDown={handleMouseDown}>
        {children}
      </div>
      {hasOutput && <Pin className="noDrag" radius={8} onMouseDown={handleMouseDown} />}
    </Background>
  );
}

export default Field;
