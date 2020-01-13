import * as React from "react";

import Ramen from "../../../src/Ramen";
import { schema } from "../../schemas/complexGraph";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const defaultGraph = {
  nodes: [
    ...Array(40).fill(0).map((_, idx) => ({
      id: "number" + idx,
      x: getRandomInt(0, 3600),
      y: getRandomInt(0, 3600),
      type: "number",
    })),
    ...Array(40).fill(0).map((_, idx) => ({
      id: "add" + idx,
      x: getRandomInt(0, 3600),
      y: getRandomInt(0, 3600),
      type: "add",
    })),
  ],
  connections: [
    ...Array(100).fill(0).map((_, idx) => ({
      originNode: "number" + getRandomInt(0, 25),
      originField: "number",
      targetNode: "add" + getRandomInt(0, 25),
      targetField: "number1",
    })),
  ],
};

function StressTest() {
  return (
    <Ramen
      schema={schema}
      initialGraph={defaultGraph}
      height={4096}
      width={4096}
    />
  );
}

export default StressTest;
