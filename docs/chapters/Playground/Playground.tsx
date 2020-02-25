import "./Resizer.css";

import * as React from "react";
import AceEditor from "react-ace";
import SplitPane from "react-split-pane";
import styled from "styled-components";

import Ramen from "../../../src/Ramen";
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
    color: black;
    margin: 0;
    padding: 1rem;
  }
`;

const CodeContainer = styled.div`
  width: 720px;
  border-right: 1px solid #e2e2e2;
  padding: 1rem;
  overflow: hidden;
  height: 10000px;
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
    parsedSchema = complexGraph.schema;
    parsedGraph = complexGraph.graph;
  }

  return (
    <EditorContainer>
      <div style={{ display: "flex" }}>
        <CodeContainer>
          <SplitPane split="horizontal" minSize={50} defaultSize={600}>
            <div style={{ background: "white" }}>
              <h3>Schema</h3>
              <AceEditor
                style={{ width: "520px" }}
                value={schema}
                onChange={(newSchema) => {
                  try {
                    JSON.parse(newSchema);
                    setSchema(newSchema);
                  } catch (err) { }
                }}
                mode="json"
                theme="github"
              />
            </div>
            <div style={{ background: "white" }}>
              <h3>Graph</h3>
              <AceEditor
                style={{ width: "520px" }}
                value={graph}
                onChange={(newGraph) => {
                  try {
                    JSON.parse(newGraph);
                    setGraph(newGraph);
                  } catch (err) { }
                }}
                mode="json"
                theme="github"
              />
            </div>
          </SplitPane>
        </CodeContainer>
        <Ramen
          height={4096}
          width={4096}
          schema={parsedSchema}
          graph={parsedGraph}
          graphState={complexGraph.graphState}
          onGraphChange={(newGraph) => {
            setGraph(JSON.stringify(newGraph, null, 4));
          }}
        />
      </div>
    </EditorContainer >
  );
}

export default Playground;
