import * as React from "react";

import MarkdownPreview from "../../utils/MarkdownPreview";

import Ramen from "../../../src/Ramen";
import * as connectionProtection from "../../schemas/connectionProtection";
import * as simpleConnection from "../../schemas/simpleConnection";

import ConnectionsOverview from "./ConnectionsOverview.md";
import VerifyingConnections from "./VerifyingConnections.md";

function ConnectionsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={ConnectionsOverview} />
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          namespace="demo1"
          schema={simpleConnection.schema}
          initialGraph={simpleConnection.graph}
          canZoom={false}
          canPan={false}
          height={400}
        />
      </div>
      <MarkdownPreview text={VerifyingConnections} />
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          namespace="demo2"
          canZoom={false}
          canPan={false}
          height={400}
          schema={connectionProtection.schema}
          initialGraph={connectionProtection.graph}
        />
      </div>
    </div>
  );
}

export default ConnectionsDoc;
