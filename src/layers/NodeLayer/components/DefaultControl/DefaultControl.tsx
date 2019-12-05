import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  flex: 1;
  border: 1px solid #d9e1e7;
  border-radius: 8px;
  height: 26px;
  align-self: center;
  min-width: 0;
`;

const ControlBackground = styled.div`
  display: flex;
  overflow: hidden;
  span {
    font-size: .9rem;
    margin-right: 8px;
  }
`;

function DefaultControl(props: any) {
  return (
    <ControlBackground>
      <span>{props.name}</span>
      <StyledInput />
    </ControlBackground>);
}

export default DefaultControl;
