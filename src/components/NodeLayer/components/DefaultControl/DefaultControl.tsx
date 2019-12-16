import * as React from "react";
import { ControlBackground, StyledInput } from "./DefaultControl.styles";

function DefaultControl(props: any) {
  const { name, ...rest } = props;

  const onInputClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ControlBackground className="noDrag">
      <StyledInput onClick={onInputClick} placeholder={name} {...rest} />
    </ControlBackground>
  );
}

export default DefaultControl;
