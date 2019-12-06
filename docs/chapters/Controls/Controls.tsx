import * as React from "react";
import { ThemeProvider } from "styled-components";

import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";
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
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            schema={customControl.schema}
            initialGraph={customControl.graph}
          >
            <DefaultEditor
              canZoom={false}
              canPan={false}
              height={400}
              controls={{
                MyCustomControl,
              }}
            />
          </RamenProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ControlsDoc;
