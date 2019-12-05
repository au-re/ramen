import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`

`;

function DefaultControl(props: any) {
  return (
    <StyledInput {...props} />);
}

export default DefaultControl;
