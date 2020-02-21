export const schema = {
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
          controlType: "InputControl",
          hideControlOnInput: true,
          input: true,
        },
        {
          id: "number2",
          dataType: "number",
          name: "Number 2",
          controlType: "InputControl",
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
          controlType: "InputControl",
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
    InputControl: {
      type: "number",
      min: 0,
      max: 100,
    },
  },
};

export const graph = {
  nodes: [
    {
      id: "node-0",
      x: 100,
      y: 50,
      type: "number",
    },
    {
      id: "node-1",
      x: 100,
      y: 200,
      type: "number",
    },
    {
      id: "node-2",
      x: 450,
      y: 50,
      name: "Add Two Numbers",
      type: "add",
    },
    {
      id: "node-3",
      x: 850,
      y: 130,
      type: "log",
    },
  ],
  connections: [
    {
      originNode: "node-0",
      originField: "number",
      targetNode: "node-2",
      targetField: "number1",
    },
    {
      originNode: "node-1",
      originField: "number",
      targetNode: "node-2",
      targetField: "number2",
    },
    {
      originNode: "node-2",
      originField: "result",
      targetNode: "node-3",
      targetField: "data",
    },
  ],
};
