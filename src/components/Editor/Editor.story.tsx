import { storiesOf } from "@storybook/react";
import * as React from "react";

import Editor from "./Editor";

function EditorDemo() {
  return <Editor></Editor>;
}

storiesOf("Editor", module)
  .add("playground", () => <EditorDemo />);
