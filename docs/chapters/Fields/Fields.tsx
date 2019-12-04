import * as React from "react";

import MarkdownPreview from "../../utils/MarkdownPreview";

import FieldsOverview from "./FieldsOverview.md";

function FieldsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={FieldsOverview} />
    </div>
  );
}

export default FieldsDoc;
