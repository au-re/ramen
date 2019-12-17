import * as React from "react";
import AceEditor from "react-ace";

import Node from "../../../src/components/NodeLayer/components/DefaultNode/DefaultNode";
import RamenProvider from "../../../src/redux/RamenProvider";
import MarkdownPreview from "../../utils/MarkdownPreview";

import NodeInstances from "./NodeInstances.md";
import NodeOverview from "./NodeOverview.md";

import "ace-builds/src-noconflict/theme-github";

const defaultNode = {
  name: "Addition",
  fields: [
    {
      id: "result",
      name: "Result",
      output: true,
    },
    {
      id: "number1",
      name: "Number 1",
      input: true,
    },
    {
      id: "number2",
      name: "Number 2",
      input: true,
    },
  ],
};

function Nodes() {
  const [schema, setSchema] = React.useState(JSON.stringify(defaultNode, null, 4));

  let parsedSchema;

  try {
    parsedSchema = JSON.parse(schema);
  } catch (err) {
    parsedSchema = {};
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={NodeOverview} />
      <div style={{ width: "100%", display: "flex", justifyContent: "spaceBetween" }}>
        <div style={{ flex: 1, margin: "1rem" }}>
          <div>schema</div>
          <AceEditor
            style={{ fontSize: "1rem", border: "2px solid #e2e2e2", borderRadius: "4px", width: "100%" }}
            value={schema}
            onChange={setSchema}
            mode="json"
            theme="github"
          />
        </div>
        <div style={{ flex: 1, padding: "2rem" }}>
          <div>result</div>
          <RamenProvider
            initialGraph={{}}
            schema={{
              nodeTypes: {
                example: parsedSchema,
              },
              dataTypes: {},
            }}
          >
            <Node
              id="test"
              type="example"
              name={"Add two numbers"}
            />
          </RamenProvider>
        </div>
      </div>
      <MarkdownPreview text={NodeInstances} />
    </div>
  );
}

export default Nodes;
