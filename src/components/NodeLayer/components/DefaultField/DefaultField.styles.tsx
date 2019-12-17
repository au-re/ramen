import styled from "styled-components";

import { lightTheme } from "../../../../themes";

export const PinContainer: any = styled.div`
  height: ${(props: any) => `${props.radius * 2}px`};
  width: ${(props: any) => `${props.radius * 2}px`};
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  align-self: center;
`;

export const Pin: any = styled(PinContainer)`
  border-radius: ${(props: any) => `${props.radius * 2}px`};
  border-color: ${({ theme }) => theme.pinBorder || lightTheme.pinBorder};
  background: ${(props) => props.color || "#2D9CDB"};
  cursor: pointer;
`;

function getTransform(props: any) {
  return (props.radius + parseInt(props.theme.borderWidth || lightTheme.borderWidth, 10));
}

export const InputPin = styled(Pin)`
  transform: translate(-${getTransform}px);
`;

export const OutputPin = styled(Pin)`
  transform: translate(${getTransform}px);
`;

export const Background: any = styled.div`
  height: ${(props: any) => props.height}px;
  display: flex;
  flex: 1;
  line-height: ${(props: any) => props.height}px;
  color: #96A1A9;
`;

export const FieldContent: any = styled.div`
  overflow: hidden;
  flex: 1;
  color: ${({ theme }) => theme.textSecondary || lightTheme.textSecondary};
  text-align: ${(props: any) => props.textAlign};
`;
