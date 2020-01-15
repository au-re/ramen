import { storiesOf } from "@storybook/react";

import Playground from "./chapters/Playground/Playground";
import StressTest from "./chapters/Playground/StressTest";

// storiesOf("Documentation|API", module)
//   .add("Editor API", WriteMe)
//   .add("Schema Definition", WriteMe)
//   .add("Graph Definition", WriteMe);

storiesOf("Documentation|Playground", module)
  .add("Playground", Playground)
  .add("Stress Test", StressTest);
