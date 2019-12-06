import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    numberToText: {
      name: "Number To Text",
      width: 280,
      fields: [
        {
          id: "number",
          dataType: "number",
          name: "Number",
          input: true,
        },
        {
          id: "text",
          name: "Text",
          dataType: "text",
          output: true,
        },
      ],
    },
    numberNode: {
      name: "Number",
      width: 140,
      fields: [
        {
          id: "number",
          dataType: "number",
          output: true,
        },
      ],
    },
    logNode: {
      name: "Log",
      width: 140,
      fields: [
        {
          id: "text",
          dataType: "text",
          input: true,
        },
      ],
    },
  },
  dataTypes: {
    number: {
      color: "#29abe1",
      validTargets: [
        "number",
      ],
    },
    text: {
      color: "#f8932b",
      validTargets: [
        "text",
      ],
    },
  },
};

export const graph: IGraph = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 50,
      type: "numberNode",
    },
    {
      id: "node2",
      x: 400,
      y: 50,
      type: "numberToText",
    },
    {
      id: "node3",
      x: 700,
      y: 50,
      type: "logNode",
    },
  ],
  connections: [
    {
      originNode: "node1",
      originField: "number",
      targetNode: "node2",
      targetField: "number",
    },
  ],
};
