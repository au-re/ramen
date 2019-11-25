import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

import * as React from "react";
import AceEditor from "react-ace";
import styled, { ThemeProvider } from "styled-components";

import Editor from "../../../src/components/Editor/Editor";
import ZoomPan from "../../../src/components/ZoomPan/ZoomPan";
import RamenProvider from "../../../src/context/RamenContext/RamenContext";
import { lightTheme } from "../../../src/themes";

const EditorContainer = styled.div`
  display: block;
  overflow: hidden;
  height: 100%;
  width: 100%;

  h3 {
    color: #fff;
    margin: 0;
    padding: 1rem;
  }
`;

const defaultSchema = {
  nodeTypes: {
    number: {
      fields: {
        out: [
          {
            id: "number",
            name: "Number",
            type: "number",
          }],
      },
    },
    add: {
      fields: {
        in: [
          {
            id: "number1",
            name: "Number",
            type: "number",
          },
          {
            id: "number2",
            name: "Number",
            type: "number",
          }],
      },
    },
  },
  socketTypes: {
    number: {
      color: "#333",
      validTargets: [
        "number",
      ],
    },
  },
};

const defaultGraph = {
  zoom: 1,
  xPos: 100,
  yPos: 200,
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "number",
    },
    {
      id: "1",
      x: 100,
      y: 200,
      type: "number",
    },
    {
      id: "2",
      x: 450,
      y: 50,
      type: "add",
    },
  ],
  connections: [
    {
      originNode: "0",
      originPin: "number",
      targetNode: "2",
      targetPin: "number1",
    },
    {
      originNode: "1",
      originPin: "number",
      targetNode: "2",
      targetPin: "number2",
    },
  ],
};

function Playground() {
  const [schema, setSchema] = React.useState(JSON.stringify(defaultSchema, null, 1));
  const [graph, setGraph] = React.useState(JSON.stringify(defaultGraph, null, 1));

  let parsedSchema;
  let parsedGraph;

  try {
    parsedSchema = JSON.parse(schema);
    parsedGraph = JSON.parse(graph);
  } catch (err) {
    parsedSchema = defaultSchema;
    parsedGraph = defaultGraph;
  }

  return (
    <EditorContainer>
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <h3>Schema</h3>
            <AceEditor
              style={{ width: "460px" }}
              value={schema}
              onChange={setSchema}
              mode="json"
              theme="github"
            />
          </div>
          <div>
            <h3>Graph</h3>
            <AceEditor
              style={{ width: "460px" }}
              value={graph}
              onChange={setGraph}
              mode="json"
              theme="github"
            />
          </div>
        </div>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            editorHeight={4096}
            editorWidth={4096}
            schema={parsedSchema}
            graph={parsedGraph}
          >
            <ZoomPan>
              <Editor />
            </ZoomPan>
          </RamenProvider>
        </ThemeProvider>
      </div>
    </EditorContainer>
  );
}

export default Playground;
