import { storiesOf } from "@storybook/react";

import GettingStarted from "./chapters/GettingStarted";
import Nodes from "./chapters/Nodes";
import WriteMe from "./chapters/WriteMe";

storiesOf("Documentation|Introduction", module)
  .add("Getting Started", GettingStarted)
  .add("Nodes", Nodes)
  .add("Connections", WriteMe)
  .add("Fields", WriteMe)
  .add("Controls", WriteMe);

storiesOf("Documentation|Customization", module)
  .add("Theming", WriteMe)
  .add("Replacing Components", WriteMe)
  .add("Custom Controls", WriteMe)
  .add("Extending Functionality", WriteMe);

storiesOf("Documentation|API", module)
  .add("Editor API", WriteMe)
  .add("Schema Definition", WriteMe)
  .add("Graph Definition", WriteMe);
