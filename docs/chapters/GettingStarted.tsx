import * as React from "react";
import { ThemeProvider } from "styled-components";

import Editor from "../../src/components/Editor/Editor";
import { modes } from "../../src/constants";
import { graph, schema } from "../schemas/simpleAddition";

import MarkdownPreview from "../utils/MarkdownPreview";
import GettingStartedDoc from "./GettingStarted.md";
import IntroDoc from "./Intro.md";

function GettingStarted() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={IntroDoc} />
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={{ mode: modes.LIGHT }}>
          <Editor
            schema={schema}
            graph={graph}
            editorHeight={2000}
            editorWidth={4096}
          />
        </ThemeProvider>
      </div>
      <MarkdownPreview text={GettingStartedDoc} />
    </div>
  );
}

export default GettingStarted;
