import styled from "styled-components";

export const Pin: any = styled.div`
  height: ${(props: any) => `${props.radius * 2}px`};
  width: ${(props: any) => `${props.radius * 2}px`};
  border-radius: ${(props: any) => `${props.radius * 2}px`};
  border: 2px solid ${({ theme }) => theme.pinBorder};
  background: ${(props) => props.color || "#2D9CDB"};
  align-self: center;
`;

export const Background: any = styled.div`
  height: ${(props: any) => props.height}px;
  display: flex;
  flex: 1;
  justify-content: ${(props: any) => (props.hasInput ? "flex-start" : "flex-end")};
  transform: translate(${(props: any) => (props.hasInput ? -1 * props.radius : props.radius)}px);
  line-height: ${(props: any) => props.height}px;
  cursor: pointer;
  color: #96A1A9;
`;
