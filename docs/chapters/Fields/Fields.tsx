import get from "lodash.get";
import * as React from "react";
import AceEditor from "react-ace";
import { ThemeProvider } from "styled-components";

import Node from "../../../src/layers/NodeLayer/components/Node/Node";
import { lightTheme } from "../../../src/themes";
import MarkdownPreview from "../../utils/MarkdownPreview";

import FieldsOverview from "./FieldsOverview.md";

const defaultSchema = {
  nodeTypes: {
    demoNode: {
      name: "Addition",
      fields: [
        {
          id: "number1",
          fieldType: "myFieldType",
          input: true,
        },
        {
          id: "number2",
          fieldType: "myFieldType",
          input: true,
        },
        {
          id: "result",
          name: "Result",
          fieldType: "myFieldType",
          output: true,
        },
      ],
    },
  },
  fieldTypes: {
    myFieldType: {
      name: "My Field",
      color: "#eb529a",
    },
  },
};

function FieldsDoc() {
  const [schema, setSchema] = React.useState(JSON.stringify(defaultSchema, null, 4));

  let parsedSchema;

  try {
    parsedSchema = JSON.parse(schema);
  } catch (err) {
    parsedSchema = {};
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={FieldsOverview} />
      <div style={{ width: "100%", display: "flex", justifyContent: "spaceBetween" }}>
        <div style={{ flex: 1, margin: "1rem" }}>
          <div>schema</div>
          <AceEditor
            style={{ fontSize: "1rem", border: "2px solid #e2e2e2", borderRadius: "4px", width: "100%" }}
            value={JSON.stringify(get(parsedSchema, "fieldTypes.myFieldType", {}), null, 4)}
            onChange={setSchema}
            mode="json"
            theme="github"
          />
        </div>
        <ThemeProvider theme={lightTheme}>
          <div style={{ flex: 1, padding: "2rem" }}>
            <div>result</div>
            <Node
              id="test"
              type="demoNode"
              name={"Add two numbers"}
              schema={parsedSchema}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default FieldsDoc;
