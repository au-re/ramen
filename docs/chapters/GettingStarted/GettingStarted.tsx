import * as React from "react";
import { ThemeProvider } from "styled-components";

import Editor from "../../../src/components/Editor/Editor";
import RamenProvider from "../../../src/context/RamenContext/RamenContext";
import { lightTheme } from "../../../src/themes";
import * as simpleAddition from "../../schemas/simpleAddition";
import * as simpleNode from "../../schemas/simpleNode";
import MarkdownPreview from "../../utils/MarkdownPreview";
import GettingStartedDoc from "./GettingStarted.md";
import IntroDoc from "./Intro.md";

function GettingStarted() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={IntroDoc} />
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            editorHeight={400}
            schema={simpleAddition.schema}
            initialGraph={simpleAddition.graph}
          >
            <Editor />
          </RamenProvider>
        </ThemeProvider>
      </div>
      <MarkdownPreview text={GettingStartedDoc} />
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            editorHeight={400}
            schema={simpleNode.schema}
            initialGraph={simpleNode.graph}
          >
            <Editor />
          </RamenProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default GettingStarted;
