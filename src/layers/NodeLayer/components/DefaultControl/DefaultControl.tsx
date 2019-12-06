import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 4px;
  height: 28px;
  align-self: center;
  min-width: 0;
  color: ${({ theme }) => theme.textColor};
  padding: 0 8px;
  font-size: .9rem;
`;

const ControlBackground = styled.div`
  display: flex;
  overflow: hidden;
  span {
    color: ${({ theme }) => theme.textSecondary};
    margin-right: 2rem;
  }
`;

function DefaultControl(props: any) {
  const { name, ...rest } = props;

  const onInputClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ControlBackground className="noDrag">
      <span>{name}</span>
      <StyledInput onClick={onInputClick} {...rest} />
    </ControlBackground>
  );
}

export default DefaultControl;
