import { IGraph } from "../../src/types";
import { ISchema } from "../../src/redux/schema/schema.types";

export const schema: ISchema = {
  nodeTypes: {
    myNodeType: {
      name: "My Node Type",
      fields: [
        {
          id: "field1",
          dataType: "number",
          controlType: "NumberControl",
          controlProps: {
            defaultValue: 10
          },
          output: true,
        },
        {
          id: "field2",
          dataType: "color",
          controlType: "ColorControl",
          controlProps: {
            defaultValue: "hello world"
          },
          output: true,
        },
      ],
    },
  },
  dataTypes: {
    number: {
      name: "Number",
      color: "#7454a1",
    },
    color: {
      name: "Color",
      color: "#7454a1",
    },
  },
};

export const graph: IGraph = {
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "myNodeType",
    },
  ],
  connections: [],
};
