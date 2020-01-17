import * as React from "react";

import EditorBackground from "./components/EditorBackground/EditorBackground";
import EditorEvents from "./components/EditorEvents/EditorEvents";
import EditorViewport from "./components/EditorViewport/EditorViewport";
import NodeLayer from "./components/NodeLayer/NodeLayer";
import NoodleLayer from "./components/NoodleLayer/NoodleLayer";
import GlobalStyle from "./GlobalStyle";
import RamenProvider from "./redux/RamenProvider";
import { IRamenProps } from "./types";

function Ramen(props: IRamenProps) {
  const {
    initialGraph,
    initialEditorState,
    graph,
    schema,
    height,
    width,
    canZoom = true,
    canPan = true,
    controls,
    children,
    onGraphChange = () => { },
  } = props;

  return (
    <RamenProvider
      onGraphChange={onGraphChange}
      initialEditorState={initialEditorState}
      initialGraph={initialGraph}
      schema={schema}
      graph={graph}
    >
      <EditorViewport canZoom={canZoom} canPan={canPan}>
        <EditorBackground height={height} width={width}>
          {children}
          <NoodleLayer />
          <NodeLayer controls={controls} />
          <EditorEvents />
          <GlobalStyle />
        </EditorBackground>
      </EditorViewport>
    </RamenProvider>
  );
}

export default Ramen;
