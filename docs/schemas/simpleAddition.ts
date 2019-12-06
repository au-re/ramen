import { IGraph, ISchema } from "../../src/types";

export const schema: ISchema = {
  nodeTypes: {
    add: {
      name: "Addition",
      width: 280,
      icon: "",
      fields: [
        {
          id: "number1",
          dataType: "number",
          name: "Number 1",
          controlType: "NumberControl",
          hideControlOnInput: true,
          input: true,
        },
        {
          id: "number2",
          dataType: "number",
          name: "Number 2",
          controlType: "NumberControl",
          hideControlOnInput: true,
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
    log: {
      name: "Log",
      fields: [
        {
          id: "data",
          name: "Data",
          dataType: "any",
          input: true,
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
          controlType: "NumberControl",
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
        "any",
      ],
    },
    any: {
      name: "Any",
      color: "#7454a1",
      validTargets: [
        "any",
      ],
    },
  },
  controlTypes: {
    NumberControl: {
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
    {
      id: "3",
      x: 850,
      y: 130,
      type: "log",
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
    {
      originNode: "2",
      originField: "result",
      targetNode: "3",
      targetField: "data",
    },
  ],
};
