import { storiesOf } from "@storybook/react";
import * as React from "react";

import Pin from "./Pin";

storiesOf("internal|Pin", module)
  .add("simple pin", () => <Pin />);
