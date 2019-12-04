import styled from "styled-components";

import { NODE_WIDTH } from "../../../../constants";
import { lightTheme } from "../../../../themes";
import { INodeProps } from "../../../../types";

export const NodeWrapper: any = styled.div`
  z-index: 100;
  position: absolute;
  display: inline-block;
  width: ${NODE_WIDTH}px;
  color: ${({ theme }) => theme.textColor || lightTheme.textColor};
  background: ${({ theme }) => theme.nodeBackground || lightTheme.nodeBackground};
  border-radius: ${({ theme }) => theme.borderRadius || lightTheme.borderRadius};
  min-height: 108px;
  display: inline-block;
  cursor: move;
  border: ${({ theme }) => theme.borderWidth || lightTheme.borderWidth} solid ${({ theme }) => theme.borderColor || lightTheme.borderColor};
`;

export const NodeTitle = styled.div`
  padding: .5rem .8rem;
  height: 36px;
`;
