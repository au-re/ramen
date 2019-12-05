import styled from "styled-components";

export const Pin: any = styled.div`
  height: ${(props: any) => `${props.radius * 2}px`};
  width: ${(props: any) => `${props.radius * 2}px`};
  border-radius: ${(props: any) => `${props.radius * 2}px`};
  border: 2px solid ${({ theme }) => theme.pinBorder};
  background: ${(props) => props.color || "#2D9CDB"};
  align-self: center;
  cursor: pointer;
`;

function getTransform(props: any) {
  return (props.radius + parseInt(props.theme.borderWidth, 10));
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

export const FieldContent = styled.div`
  overflow: hidden;
  padding: 0 .25rem;
  flex: 1;
  text-align: ${(props) => props.textAlign};
`;
