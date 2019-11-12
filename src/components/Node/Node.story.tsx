import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ThemeProvider } from "emotion-theming";
import { modes } from "../../constants";
import Node from "./Node";

storiesOf("internal|Node", module)
  .add("simple node", () => (
    <ThemeProvider theme={{ mode: modes.LIGHT }}>
      <div id="GraphEditor" style={{ height: "400px", width: "400px" }}>
        <Node />
      </div>
    </ThemeProvider>
  ));
