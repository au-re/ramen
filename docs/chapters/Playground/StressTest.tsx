import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import * as ComplexGraph from "../../schemas/complexGraph";
import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const defaultGraph = {
  nodes: [
    ...Array(10).fill(0).map((_, idx) => ({
      id: "number" + idx,
      x: getRandomInt(0, 1200),
      y: getRandomInt(0, 1200),
      type: "number",
    })),
    ...Array(10).fill(0).map((_, idx) => ({
      id: "add" + idx,
      x: getRandomInt(0, 1200),
      y: getRandomInt(0, 1200),
      type: "add",
    })),
  ],
  connections: [
    ...Array(20).fill(0).map((_, idx) => ({
      originNode: "number" + getRandomInt(0, 10),
      originField: "number",
      targetNode: "add" + getRandomInt(0, 10),
      targetField: "number1",
    })),
  ],
};

function StressTestControlled() {
  const [graph, setGraph] = React.useState(defaultGraph);

  return (
    <ThemeProvider theme={lightTheme}>
      <RamenProvider
        schema={ComplexGraph.schema}
        graph={graph}
        onGraphChange={(newGraph) => setGraph(newGraph)}
      >
        <DefaultEditor
          height={4096}
          width={4096}
        />
      </RamenProvider>
    </ThemeProvider>
  );
}

function StressTest() {
  return (
    <ThemeProvider theme={lightTheme}>
      <RamenProvider
        schema={ComplexGraph.schema}
        initialGraph={defaultGraph}
      >
        <DefaultEditor
          height={4096}
          width={4096}
        />
      </RamenProvider>
    </ThemeProvider>
  );
}

export { StressTest };
export default StressTestControlled;
