export const schema = {
  nodeTypes: {
    numberNode: {
      name: "My Node",
      fields: [
        {
          id: "field1",
          dataType: "number",
          output: true,
        }
      ]
    },
    additionNode: {
      name: "Addition",
      fields: [
        {
          id: "number1",
          dataType: "number",
          input: true,
        },
        {
          id: "number2",
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
  },
  dataTypes: {
    number: {
      name: "Number",
      color: "#7454a1",
    },
  },
};

export const graph = {
  nodes: [
    {
      id: "0",
      x: 100,
      y: 50,
      type: "numberNode",
    },
    {
      id: "1",
      x: 200,
      y: 50,
      type: "additionNode",
    },
  ],
  connections: [],
};
