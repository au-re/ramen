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

function getTransform({ isInput }: any) {
  return (props: any) => {
    const pinBorderWidth = parseInt(props.theme.borderWidth || lightTheme.borderWidth, 10);
    const transformX = (props.radius + pinBorderWidth);
    return `translate(${isInput ? "-" : ""}${transformX}px, -${pinBorderWidth}px)`;
  };
}

export const InputPin = styled(Pin)`
  transform: ${getTransform({ isInput: true })};
`;

export const OutputPin = styled(Pin)`
  transform: ${getTransform({ isInput: false })};
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
  display: flex;
  flex: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary || lightTheme.textSecondary};
  text-align: ${(props: any) => props.align};
  justify-content: ${(props: any) => props.align};

  > * {
    align-self: center;
  }
`;
