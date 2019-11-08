import { storiesOf } from "@storybook/react";
import * as React from "react";

import Noodle from "./Noodle";

storiesOf("Noodle", module)
  .add("simple noodle", () => <Noodle />);
