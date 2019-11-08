import { storiesOf } from "@storybook/react";
import * as React from "react";

import Node from "./Node";

storiesOf("Node", module)
  .add("simple node", () => <Node />);
