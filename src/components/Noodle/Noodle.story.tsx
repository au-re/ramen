import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ThemeProvider } from "styled-components";
import { modes } from "../../constants";
import Noodles from "../Noodles/Noodles";
import Noodle from "./Noodle";

storiesOf("internal|Noodle", module)
  .add("simple noodle", () => (
    <ThemeProvider theme={{ mode: modes.LIGHT }}>
      <Noodles>
        <Noodle
          start={{ x: 100, y: 200 }}
          end={{ x: 200, y: 400 }}
        />
      </Noodles>
    </ThemeProvider>
  ));
