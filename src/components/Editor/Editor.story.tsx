import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "../../themes";
import ZoomPan from "../ZoomPan/ZoomPan";
import Editor from "./Editor";
import { graph, schema } from "./examples/demo1";

storiesOf("internal|Editor", module)
  .add("simple ", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Editor
        schema={schema}
        graph={graph}
      />
    </div>
  ))
  .add("with theme", () => (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Editor
          schema={schema}
          graph={graph}
        />
      </div>
    </ThemeProvider>
  ))
  .add("with zoom and pan", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <RamenProvider
        schema={schema}
        initialGraph={graph}
        editorHeight={4096}
        editorWidth={4096}
      >
        <ZoomPan>
          <Editor />
        </ZoomPan>
      </RamenProvider>
    </div>
  ));
