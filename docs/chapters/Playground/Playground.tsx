import * as React from "react";
import AceEditor from "react-ace";
import styled, { ThemeProvider } from "styled-components";

import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";
import * as complexGraph from "../../schemas/complexGraph";

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

function Playground() {
  const [schema, setSchema] = React.useState(JSON.stringify(complexGraph.schema, null, 4));
  const [graph, setGraph] = React.useState(JSON.stringify(complexGraph.graph, null, 4));

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
