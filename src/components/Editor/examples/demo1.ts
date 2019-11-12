import { IGraph, ISchema } from "../../../types";

export const schema: ISchema = {
  nodeTypes: {
    tile: {
      name: "tile",
      icon: "",
      controls: ["controlId", "controlId2"],
      fields: {
        in: [
          {
            id: "in",
            name: "input",
            type: "data",
            control: "controlId",
          },
          {
            id: "in2",
            name: "input",
            type: "data",
            control: "controlId",
          },
        ],
        out: [
          {
            id: "out",
            name: "result",
            type: "data",
          },
          {
            id: "out2",
            name: "result",
            type: "data",
          },
        ],
      },
    },
  },
  socketTypes: {
    string: {
      color: "#333",
      validTargets: [
        "string",
      ],
    },
    data: {
      color: "#333",
      validTargets: [
        "data",
      ],
    },
  },
};

export const graph: IGraph = {
  nodes: [
    {
      id: "0",
      x: 0,
      y: 0,
      name: "my tile",
      type: "tile",
    },
    {
      id: "1",
      x: 0,
      y: 0,
      name: "other tile",
      type: "tile",
    },
  ],
  connections: [
    {
      originNode: "0",
      originPin: "out",
      targetNode: "1",
      targetPin: "in",
    },
  ],
};
