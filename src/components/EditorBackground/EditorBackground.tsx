import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { IStoreState } from "../../redux/types";
import { lightTheme } from "../../themes";

const EditorBackground: any = styled.div`
  height: ${(props: any) => props.height ? `${props.height}px` : "100%"};
  width: ${(props: any) => props.width ? `${props.width}px` : "100%"};
  position: relative;
  background-image: radial-gradient(${({ theme }) => (theme.editorBackgroundMuted || lightTheme.editorBackgroundMuted)}, transparent 10%);
  background-color: ${({ theme }) => (theme.editorBackground || lightTheme.editorBackground)};
  background-size: 1.5rem 1.5rem;
`;

function Background(props: any) {
  const editorId = useSelector((state: IStoreState) => state.references.editorId);
  return (
    <EditorBackground
      {...props}
      id={editorId}
    />);
}

export default React.memo(Background);
