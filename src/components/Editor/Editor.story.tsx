import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme } from "../../themes";
import Editor from "./Editor";
import { graph, schema } from "./examples/demo1";

function EditorDemo() {
  return (
    <Editor
      schema={schema}
      graph={graph}
      editorHeight={4096}
      editorWidth={4096}
    />
  );
}

storiesOf("internal|Editor", module)
  .add("playground", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ThemeProvider theme={lightTheme}>
        <EditorDemo />
      </ThemeProvider>
    </div>
  ));
