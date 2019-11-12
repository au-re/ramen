import { storiesOf } from "@storybook/react";
import * as React from "react";

import Background from "../Background/Background";
import ZoomPan from "./ZoomPan";

function ZoomPanDemo() {
  return (
    <ZoomPan>
      <Background height={4096} width={4096} />
    </ZoomPan>
  );
}

storiesOf("internal|ZoomPan", module)
  .add("playground", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ZoomPanDemo />
    </div>
  ));
