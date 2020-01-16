import * as React from "react";

import EditorBackground from "./components/EditorBackground/EditorBackground";
import EditorEvents from "./components/EditorEvents/EditorEvents";
import EditorViewport from "./components/EditorViewport/EditorViewport";
import NodeLayer from "./components/NodeLayer/NodeLayer";
import NoodleLayer from "./components/NoodleLayer/NoodleLayer";
import GlobalStyle from "./GlobalStyle";
import RamenProvider from "./redux/RamenProvider";

function Ramen(props: any) {
  const {
    initialGraph,
    initialEditorState,
    schema,
    height,
    width,
    canZoom = true,
    canPan = true,
    controls,
    children,
  } = props;

  return (
    <RamenProvider
      initialEditorState={initialEditorState}
      initialGraph={initialGraph}
      schema={schema}
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
