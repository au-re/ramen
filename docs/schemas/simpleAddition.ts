import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    add: {
      name: "Add",
      icon: "",
      fields: {
        in: [
          {
            id: "number1",
            name: "Number",
            type: "number",
            control: "numberControl",
          },
          {
            id: "number2",
            name: "Number",
            type: "number",
            control: "numberControl",
          },
        ],
        out: [
          {
            id: "result",
            name: "Number",
            type: "number",
          },
        ],
      },
    },
    number: {
      name: "Number",
      icon: "",
      controls: ["numberControl"],
      fields: {
        out: [
          {
            id: "number",
            name: "Number",
            type: "number",
          },
        ],
      },
    },
  },
  socketTypes: {
    number: {
      color: "#29abe1",
      validTargets: [
        "number",
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
      type: "number",
    },
    {
      id: "1",
      x: 100,
      y: 200,
      type: "number",
    },
    {
      id: "2",
      x: 450,
      y: 50,
      type: "add",
    },
  ],
  connections: [
    {
      originNode: "0",
      originPin: "number",
      targetNode: "2",
      targetPin: "number1",
    },
    {
      originNode: "1",
      originPin: "number",
      targetNode: "2",
      targetPin: "number2",
    },
  ],
};
