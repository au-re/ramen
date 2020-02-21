import React from "react";

import { PIN_RADIUS, types } from "../../../../constants";
import { Background, FieldContent, InputPin, OutputPin, PinContainer } from "./DefaultField.styles";

function DefaultField(props: any) {
  const { input, output, children, height, color, fieldId, nodeId, className } = props;

  let align = "center";
  if (input && !output) align = "left";
  if (output && !input) align = "right";

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
      <FieldContent align={align}>
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
