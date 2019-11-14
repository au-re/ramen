import * as React from "react";
import { ThemeProvider } from "styled-components";

import Editor from "../../src/components/Editor/Editor";
import { modes } from "../../src/constants";
import { graph, schema } from "../schemas/simpleAddition";

function GettingStarted() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h1>Getting Started</h1>
      <a href="https://www.npmjs.com/package/@au-re/ramen">
        <img src="https://img.shields.io/npm/v/@au-re/ramen" alt="npmversion" />
      </a>
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={{ mode: modes.LIGHT }}>
          <Editor
            schema={schema}
            graph={graph}
            editorHeight={400}
            editorWidth={4096}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default GettingStarted;
