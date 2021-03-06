import * as React from "react";
import { ThemeProvider } from "styled-components";

import Ramen from "../../../src/Ramen";
import { darkTheme, lightTheme } from "../../../src/themes";
import * as simpleAddition from "../../schemas/simpleAddition";
import MarkdownPreview from "../../utils/MarkdownPreview";

import ThemingIntro from "./ThemingIntro.md";
import ThemingDoc from "./ThemingMain.md";

const pinkTheme = {
  fontName: "Helvetica, Oswald, sans-serif",
  fontSize: "14px",
  borderRadius: "12px",
  borderWidth: "12px",
  inputBackground: "#f774b3",
  textColor: "#FAFCFE",
  textSecondary: "#FAFCFE",
  borderColor: "#f774b3",
  editorBackground: "#ffdbe7",
  editorBackgroundMuted: "#db2e6a",
  nodeBackground: "rgb(247, 116, 179, .8)",
  nodeBackgroundSelected: "rgb(247, 116, 179, .8)",
  pinBorder: "#f774b3",
  noodleColor: "#db2e6a",
  nodeBorderSelected: "#FFFFFF",
};

function Theming() {
  const [theme, selectTheme] = React.useState("lightTheme");

  const themes = {
    lightTheme,
    darkTheme,
    pinkTheme,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MarkdownPreview text={ThemingIntro} />
      <select onChange={(e) => selectTheme(e.target.value)}>
        <option value="lightTheme">light</option>
        <option value="darkTheme">dark</option>
        <option value="pinkTheme">pink</option>
      </select>
      <div style={{ width: "100%", height: "400px" }}>
        <ThemeProvider theme={themes[theme]}>
          <Ramen
            canPan={false}
            canZoom={false}
            height={400}
            schema={simpleAddition.schema}
            initialGraph={simpleAddition.graph}
          />
        </ThemeProvider>
      </div>
      <MarkdownPreview text={ThemingDoc} />
    </div>
  );
}

export default Theming;
