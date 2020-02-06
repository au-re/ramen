import styled from "styled-components";

export const Viewport: any = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const EditorWrapperBackground: any = styled.div.attrs(({ xPos, yPos, scale }: any) => ({
  style: {
    transform: `translate(${xPos}px, ${yPos}px) scale(${scale})`,
  }
}))`
  display: inline-block;
  ${(props: any) => !props.width && "width: 100%;"};
  transform-origin: 0px 0px 0px;
`;
