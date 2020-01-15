import { storiesOf } from "@storybook/react";

import ConnectionsDoc from "./chapters/Connections/Connections";
import ControlsDoc from "./chapters/Controls/Controls";
import FieldsDoc from "./chapters/Fields/Fields";
import GettingStarted from "./chapters/GettingStarted/GettingStarted";
import Nodes from "./chapters/Nodes/Nodes";

storiesOf("Documentation|Introduction", module)
  .add("Getting Started", GettingStarted)
  .add("Nodes", Nodes)
  .add("Fields", FieldsDoc)
  .add("Controls", ControlsDoc)
  .add("Connections", ConnectionsDoc);
