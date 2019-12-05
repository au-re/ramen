import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    add: {
      name: "Add",
      icon: "",
      fields: [
        {
          id: "number1",
          fieldType: "numberField",
          controlType: "numberControl",
          input: true,
        },
        {
          id: "number2",
          fieldType: "numberField",
          controlType: "numberControl",
          input: true,
        },
        {
          id: "result",
          fieldType: "numberField",
          output: true,
        },
      ],
    },
    number: {
      name: "Number",
      icon: "",
      fields: [
        {
          id: "number",
          fieldType: "numberField",
          output: true,
        },
      ],
    },
  },
  fieldTypes: {
    numberField: {
      name: "Number",
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
      originField: "number",
      targetNode: "2",
      targetField: "number1",
    },
    {
      originNode: "1",
      originField: "number",
      targetNode: "2",
      targetField: "number2",
    },
  ],
};
