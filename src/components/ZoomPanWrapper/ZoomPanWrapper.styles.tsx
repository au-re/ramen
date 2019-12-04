import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ZoomPanContainer: any = styled.div`
  transform-origin: 0px 0px 0px;
  transform: translate(${(props: any) => props.xPos}px, ${(props: any) => props.yPos}px) scale(${(props: any) => props.scale});
`;
