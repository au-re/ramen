import * as React from "react";
import { ThemeProvider } from "styled-components";

import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
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
            schema={simpleAddition.schema}
            initialGraph={simpleAddition.graph}
          >
            <DefaultEditor
              canZoom={false}
              canPan={false}
              height={400}
            />
          </RamenProvider>
        </ThemeProvider>
      </div>
      <MarkdownPreview text={GettingStartedDoc} />
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            schema={simpleNode.schema}
            initialGraph={simpleNode.graph}
          >
            <DefaultEditor
              canZoom={false}
              canPan={false}
              height={400}
            />
          </RamenProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default GettingStarted;
