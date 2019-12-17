import * as React from "react";
import { ThemeProvider } from "styled-components";

import Ramen from "../../../src/Ramen";
import * as customControl from "../../schemas/customControl";
import MarkdownPreview from "../../utils/MarkdownPreview";

import ControlsOverview from "./ControlsOverview.md";

function MyCustomControl(props) {
  return (<button >I'm custom!</button>);
}

function ControlsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={ControlsOverview} />
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          canZoom={false}
          canPan={false}
          height={400}
          schema={customControl.schema}
          initialGraph={customControl.graph}
          controls={{
            MyCustomControl,
          }}
        />
      </div>
    </div>
  );
}

export default ControlsDoc;
