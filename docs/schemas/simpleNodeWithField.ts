import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
      fields: [
        {
          id: "field1",
          dataType: "number",
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
  },
};

export const graph: IGraph = {
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "numberNode",
    },
  ],
  connections: [],
};
