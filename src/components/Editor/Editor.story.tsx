import { storiesOf } from "@storybook/react";
import * as React from "react";

import Editor from "./Editor";

function EditorDemo() {
  return (
    <Editor
      editorHeight={4096}
      editorWidth={4096}
    />
  );
}

storiesOf("Editor", module)
  .add("playground", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <EditorDemo />
    </div>
  ));
