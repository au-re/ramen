import React from "react";

import { IRamenProvider } from "../types";
import EditorProvider from "./EditorProvider/EditorProvider";
import GraphProvider from "./GraphProvider/GraphProvider";
import SelectionProvider from "./SelectionProvider/SelectionProvider";

function RamenProvider(props: IRamenProvider) {
  const { schema, initialGraph, graph, editorState, children, onGraphChange } = props;

  return (
    <GraphProvider
      schema={schema}
      initialGraph={initialGraph}
      graph={graph}
      onGraphChange={onGraphChange}
    >
      <SelectionProvider>
        <EditorProvider initialEditorState={editorState}>
          {children}
        </EditorProvider>
      </SelectionProvider>
    </GraphProvider>
  );
}

export default RamenProvider;
