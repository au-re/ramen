import React from "react";
import { Background, Pin } from "./Field.styles";

function Field(props: any) {
  const { hasInput, hasOutput, children, height, color } = props;
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
      {hasInput && <Pin className="noDrag" radius={8} onMouseDown={handleMouseDown} color={color} />}
      <div style={{ padding: "0 .5rem" }} onMouseDown={handleMouseDown}>
        {children}
      </div>
      {hasOutput && <Pin className="noDrag" radius={8} onMouseDown={handleMouseDown} color={color} />}
    </Background>
  );
}

export default Field;
