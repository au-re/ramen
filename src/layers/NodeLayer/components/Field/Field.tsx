import React from "react";

import { PIN_RADIUS } from "../../../../constants";
import { Background, FieldContent, InputPin, OutputPin, PinContainer } from "./Field.styles";

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
    >
      {
        input
          ? (
            <InputPin
              className="noDrag"
              radius={PIN_RADIUS}
              onMouseUp={onMouseUp}
              color={color}
            />
          )
          : <PinContainer radius={PIN_RADIUS} />
      }
      <FieldContent textAlign={textAlign}>
        {children}
      </FieldContent>
      {
        output
          ? (
            <OutputPin
              className="noDrag"
              radius={PIN_RADIUS}
              onMouseDown={handleMouseDown}
              color={color}
            />
          )
          : <PinContainer radius={PIN_RADIUS} />
      }
    </Background>
  );
}

export default Field;
