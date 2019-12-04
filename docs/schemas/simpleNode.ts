import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
      fields: {
        out: [
          {
            id: "number",
            fieldType: "numberField",
          },
        ],
      },
    },
  },
  fieldTypes: {
    numberField: {
      name: "Number",
      color: "#29abe1",
      validTargets: [
        "numberField",
      ],
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
