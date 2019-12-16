import React from "react";

import { PIN_RADIUS, types } from "../../../../constants";
import { Background, FieldContent, InputPin, OutputPin, PinContainer } from "./DefaultField.styles";

function DefaultField(props: any) {
  const { input, output, children, height, color, fieldId, nodeId } = props;

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
              data-type={types.FIELD}
              data-isinput={true}
              data-fieldid={fieldId}
              data-nodeid={nodeId}
              className="noDrag"
              radius={PIN_RADIUS}
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
              data-type={types.FIELD}
              data-isinput={false}
              data-fieldid={fieldId}
              data-nodeid={nodeId}
              className="noDrag"
              radius={PIN_RADIUS}
              color={color}
            />
          )
          : <PinContainer radius={PIN_RADIUS} />
      }
    </Background>
  );
}

export default DefaultField;
