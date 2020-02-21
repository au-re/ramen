import { storiesOf } from "@storybook/react";

import Theming from "./chapters/Theming/Theming";
import WriteMe from "./chapters/WriteMe";
import CustomControlsDoc from "./chapters/Controls/CustomControls";

storiesOf("Documentation|Customization", module)
  .add("Theming", Theming)
  // .add("Replacing Components", WriteMe)
  .add("Custom Controls", CustomControlsDoc)
  // .add("Extending Functionality", WriteMe);
