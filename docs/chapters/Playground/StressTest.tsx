import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";

const defaultSchema = {
  nodeTypes: {
    number: {
      fields: [
        {
          id: "number",
          dataType: "number",
          output: true,
        },
      ],
    },
    add: {
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
      ],
    },
  },
  dataTypes: {
    number: {
      name: "Number",
      color: "#333",
      validTargets: [
        "number",
      ],
    },
  },
};

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
  const [schema, setSchema] = React.useState(defaultSchema);
  const [graph, setGraph] = React.useState(defaultGraph);

  return (
    <ThemeProvider theme={lightTheme}>
      <RamenProvider
        schema={schema}
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
        schema={defaultSchema}
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
