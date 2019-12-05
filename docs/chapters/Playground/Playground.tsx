import * as React from "react";
import AceEditor from "react-ace";
import styled, { ThemeProvider } from "styled-components";

import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

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
      name: "Number",
      fields: [
        {
          id: "number",
          dataType: "number",
          output: true,
        },
      ],
    },
    add: {
      name: "Add",
      fields: [
        {
          id: "number1",
          dataType: "number",
          input: true,
        },
        {
          id: "number2",
          dataType: "number",
          input: true,
        },
      ],
    },
  },
  dataTypes: {
    number: {
      name: "Number",
      color: "#333",
      validTargets: [
        "number",
      ],
    },
  },
};

const defaultGraph = {
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
      originField: "number",
      targetNode: "2",
      targetField: "number1",
    },
    {
      originNode: "1",
      originField: "number",
      targetNode: "2",
      targetField: "number2",
    },
  ],
};

function Playground() {
  const [schema, setSchema] = React.useState(JSON.stringify(defaultSchema, null, 4));
  const [graph, setGraph] = React.useState(JSON.stringify(defaultGraph, null, 4));

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
            schema={parsedSchema}
            graph={parsedGraph}
            onGraphChange={(newGraph) => setGraph(JSON.stringify(newGraph, null, 4))}
          >
            <DefaultEditor
              height={4096}
              width={4096}
            />
          </RamenProvider>
        </ThemeProvider>
      </div>
    </EditorContainer >
  );
}

export default Playground;
