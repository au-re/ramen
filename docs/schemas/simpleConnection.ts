import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    additionNode: {
      name: "Addition",
      width: 280,
      icon: "",
      fields: [
        {
          id: "number1",
          dataType: "number",
          name: "Number 1",
          input: true,
        },
        {
          id: "number2",
          dataType: "number",
          name: "Number 2",
          input: true,
        },
        {
          id: "result",
          name: "Result",
          dataType: "number",
          output: true,
        },
      ],
    },
    numberNode: {
      name: "Number",
      width: 140,
      icon: "",
      fields: [
        {
          id: "number",
          dataType: "number",
          output: true,
        },
      ],
    },
  },
  dataTypes: {
    number: {
      validTargets: [
        "number",
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
      type: "additionNode",
    },
  ],
  connections: [
    {
      originNode: "node1",
      originField: "number",
      targetNode: "node2",
      targetField: "number1",
    },
  ],
};
