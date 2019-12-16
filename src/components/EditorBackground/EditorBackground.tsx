import * as React from "react";
import styled from "styled-components";
import { EDITOR_ID } from "../../constants";

const EditorBackground: any = styled.div.attrs(() => ({ id: EDITOR_ID }))`
  height: ${(props: any) => props.height ? `${props.height}px` : "100%"};
  width: ${(props: any) => props.width ? `${props.width}px` : "100%"};
  position: relative;
  background-image: radial-gradient(${({ theme }) => (theme.editorBackgroundMuted || "#96A1A9")}, transparent 10%);
  background-color: ${({ theme }) => (theme.editorBackground || "#fff")};
  background-size: 1.5rem 1.5rem;
`;

export default React.memo(EditorBackground);
