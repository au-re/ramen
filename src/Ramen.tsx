import * as React from "react";

import EditorBackground from "./components/EditorBackground/EditorBackground";
import EditorEvents from "./components/EditorEvents/EditorEvents";
import EditorViewport from "./components/EditorViewport/EditorViewport";
import NodeLayer from "./components/NodeLayer/NodeLayer";
import NoodleLayer from "./components/NoodleLayer/NoodleLayer";
import GlobalStyle from "./GlobalStyle";
import RamenProvider from "./redux/RamenProvider";
import { IRamenProps } from "./types";

const fn = () => { };

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
    onGraphChange = fn,
    onConnectionCreate = fn,
    onConnectionDelete = fn,
    onNodePositionChange = fn,
    onSelection = fn,
  } = props;

  return (
    <RamenProvider
      onSelection={onSelection}
      onGraphChange={onGraphChange}
      onConnectionCreate={onConnectionCreate}
      onConnectionDelete={onConnectionDelete}
      onNodePositionChange={onNodePositionChange}
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
