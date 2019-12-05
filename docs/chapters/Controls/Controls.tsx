import * as React from "react";

import MarkdownPreview from "../../utils/MarkdownPreview";

import ControlsOverview from "./ControlsOverview.md";

function ControlsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={ControlsOverview} />
    </div>
  );
}

export default ControlsDoc;
