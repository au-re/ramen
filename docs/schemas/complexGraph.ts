import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    add: {
      name: "Addition",
      width: 280,
      icon: "",
      fields: [
        {
          id: "number0",
          dataType: "number",
          controlType: "numberControl",
        },
        {
          id: "number1",
          dataType: "number",
          controlType: "numberControl",
          input: true,
        },
        {
          id: "number2",
          dataType: "number",
          hideControlOnInput: true,
          controlType: "numberControl",
          input: true,
        },
        {
          id: "number4",
          dataType: "number",
          controlType: "numberControl",
          input: true,
          output: true,
        },
        {
          id: "number3",
          dataType: "number",
          input: true,
        },
        {
          id: "result",
          dataType: "number",
          output: true,
        },
      ],
    },
    number: {
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
      name: "Number",
      color: "#29abe1",
      validTargets: [
        "number",
      ],
    },
  },
  controlTypes: {
    numberControl: {
      type: "number",
      min: 0,
      max: 100,
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
      name: "Add Two Numbers",
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
