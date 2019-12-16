import styled from "styled-components";

export const StyledInput = styled.input`
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

export const ControlBackground = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  span {
    color: ${({ theme }) => theme.textSecondary};
    margin-right: 2rem;
  }
`;
