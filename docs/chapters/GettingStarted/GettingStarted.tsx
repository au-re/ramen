import * as React from "react";

import Ramen from "../../../src/Ramen";
import * as simpleAddition from "../../schemas/simpleAddition";
import * as simpleNode from "../../schemas/simpleNode";
import * as simpleNodeWithField from "../../schemas/simpleNodeWithField";
import MarkdownPreview from "../../utils/MarkdownPreview";

import AddingFields from "./AddingFields.md";
import ConnectingNodes from "./ConnectingNodes.md";
import GettingStartedDoc from "./GettingStarted.md";
import IntroDoc from "./Intro.md";
import OnGraphChange from "./OnGraphChange.md";

function GettingStarted() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={IntroDoc} />
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          schema={simpleAddition.schema}
          initialGraph={simpleAddition.graph}
          canZoom={false}
          canPan={false}
          height={400}
        />
      </div>
      <MarkdownPreview text={GettingStartedDoc} />
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <Ramen
          schema={simpleNode.schema}
          initialGraph={simpleNode.graph}
          canZoom={false}
          canPan={false}
          height={400}
        />
      </div>
      <MarkdownPreview text={AddingFields} />
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <Ramen
          schema={simpleNodeWithField.schema}
          initialGraph={simpleNodeWithField.graph}
          canZoom={false}
          canPan={false}
          height={400}
        />
      </div>
      <MarkdownPreview text={ConnectingNodes} />
      <MarkdownPreview text={OnGraphChange} />
    </div>
  );
}

export default GettingStarted;
