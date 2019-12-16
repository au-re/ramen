import styled from "styled-components";

export const Viewport: any = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const EditorWrapperBackground: any = styled.div`
  display: inline-block;
  ${(props: any) => !props.width && "width: 100%;"}
  transform-origin: 0px 0px 0px;
  transform: translate(${(props: any) => props.xPos}px, ${(props: any) => props.yPos}px) scale(${(props: any) => props.scale});
`;
