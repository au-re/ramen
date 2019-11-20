import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "../../themes";
import Background from "../Background/Background";
import ZoomPan from "./ZoomPan";

function SelectableThemeDemo() {
  const [theme, selectTheme] = React.useState("lightTheme");
  const themes = {
    lightTheme,
    darkTheme,
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <div style={{ height: "100vh", width: "100vw", background: "#333" }}>
        <select onChange={(e) => selectTheme(e.target.value)}>
          <option value="lightTheme">light</option>
          <option value="darkTheme">dark</option>
        </select>
        <div style={{ height: "400px", width: "600px" }}>
          <ZoomPan>
            <Background height={4096} width={4096} />
          </ZoomPan>
        </div>
      </div>
    </ThemeProvider>
  );
}

storiesOf("internal|ZoomPan", module)
  .add("zoomable and pan-able background", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ZoomPan>
        <Background height={4096} width={4096} />
      </ZoomPan>
    </div>
  ))
  .add("inside small container", () => (
    <div style={{ height: "100vh", width: "100vw", background: "#333" }}>
      <div style={{ height: "400px", width: "600px" }}>
        <ZoomPan>
          <Background height={600} width={800} />
        </ZoomPan>
      </div>
    </div>
  ))
  .add("with themes", () => (<SelectableThemeDemo />))
  .add("disabled zoom/pan", () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ZoomPan
        zoom={false}
        pan={false}
      >
        <Background height={4096} width={4096} />
      </ZoomPan>
    </div>
  ));
