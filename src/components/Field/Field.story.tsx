import { storiesOf } from "@storybook/react";
import * as React from "react";

import Field from "./Field";

storiesOf("internal|Field", module)
  .add("simple field", () => <Field />);
