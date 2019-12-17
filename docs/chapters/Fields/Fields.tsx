import get from "lodash.get";
import * as React from "react";
import AceEditor from "react-ace";

import DefaultNode from "../../../src/components/NodeLayer/components/DefaultNode/DefaultNode";
import MarkdownPreview from "../../utils/MarkdownPreview";

import RamenProvider from "../../../src/redux/RamenProvider";
import FieldsOverview from "./FieldsOverview.md";

const defaultSchema = {
  nodeTypes: {
    demoNode: {
      name: "Addition",
      fields: [
        {
          id: "number1",
          dataType: "myDataType",
          input: true,
        },
        {
          id: "number2",
          dataType: "myDataType",
          input: true,
        },
        {
          id: "result",
          name: "Result",
          dataType: "myDataType",
          output: true,
        },
      ],
    },
  },
  dataTypes: {
    myDataType: {
      name: "My Data Type",
      color: "#eb529a",
    },
  },
};

function FieldsDoc() {
  const [schema, setSchema] = React.useState(JSON.stringify(get(defaultSchema, "dataTypes.myDataType", {}), null, 4));

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
              ...defaultSchema,
              dataTypes: {
                myDataType: parsedSchema,
              },
            }}
          >
            <DefaultNode
              id="test"
              type="demoNode"
              name={"Add two numbers"}
            />
          </RamenProvider>

        </div>
      </div>
    </div>
  );
}

export default FieldsDoc;
