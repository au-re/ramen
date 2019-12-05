import React from "react";
import { Background, OutputPin, InputPin, FieldContent } from "./Field.styles";

function Field(props: any) {
  const { input, output, children, height, color } = props;
  const { onMouseUp = () => { }, onMouseDown = () => { } } = props;

  const handleMouseDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onMouseDown();
  };

  let textAlign = "center";
  if (input && !output) textAlign = "left";
  if (output && !input) textAlign = "right";

  return (
    <Background
      height={height}
      hasInput={input}
      radius={8}
    >
      {
        input && (
          <InputPin
            className="noDrag"
            radius={8}
            onMouseUp={onMouseUp}
            color={color}
          />
        )
      }
      <FieldContent textAlign={textAlign}>
        {children}
      </FieldContent>
      {
        output && (
          <OutputPin
            className="noDrag"
            radius={8}
            onMouseDown={handleMouseDown}
            color={color}
          />
        )
      }
    </Background>
  );
}

export default Field;
