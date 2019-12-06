import * as React from "react";

import MarkdownPreview from "../../utils/MarkdownPreview";

import { ThemeProvider } from "styled-components";
import DefaultEditor from "../../../src/components/DefaultEditor/DefaultEditor";
import RamenProvider from "../../../src/context/RamenProvider";
import { lightTheme } from "../../../src/themes";
import * as connectionProtection from "../../schemas/connectionProtection";
import * as simpleConnection from "../../schemas/simpleConnection";

import ConnectionsOverview from "./ConnectionsOverview.md";
import VerifyingConnections from "./VerifyingConnections.md";

function ConnectionsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={ConnectionsOverview} />
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            schema={simpleConnection.schema}
            initialGraph={simpleConnection.graph}
          >
            <DefaultEditor
              canZoom={false}
              canPan={false}
              height={400}
            />
          </RamenProvider>
        </ThemeProvider>
      </div>
      <MarkdownPreview text={VerifyingConnections} />
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={lightTheme}>
          <RamenProvider
            schema={connectionProtection.schema}
            initialGraph={connectionProtection.graph}
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

export default ConnectionsDoc;
