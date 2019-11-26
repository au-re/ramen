import React from "react";
import DragProvider from "../../context/DragContext/DragContext";
import Editor from "./Editor";

function EditorContainer({ children, ...rest }: any) {
  return (
    <DragProvider>
      <Editor {...rest}>
        {children}
      </Editor>
    </DragProvider>
  );
}

export default EditorContainer;
