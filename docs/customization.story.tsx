import { storiesOf } from "@storybook/react";

import Theming from "./chapters/Theming/Theming";
import WriteMe from "./chapters/WriteMe";

storiesOf("Documentation|Customization", module)
  .add("Theming", Theming)
  .add("Replacing Components", WriteMe)
  .add("Custom Controls", WriteMe)
  .add("Extending Functionality", WriteMe);
