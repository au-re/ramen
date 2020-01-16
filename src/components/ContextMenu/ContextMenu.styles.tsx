import styled from "styled-components";
import { lightTheme } from "../../themes";

export const ContextMenuBackground: any = styled.div`
  position: absolute;
  z-index: 200;
  top: ${(props: any) => props.posY || 0}px;
  left: ${(props: any) => props.posX || 0}px;
  background: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius || lightTheme.borderRadius};
`;
