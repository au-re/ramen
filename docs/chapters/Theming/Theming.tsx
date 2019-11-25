import * as React from "react";
import { ThemeProvider } from "styled-components";

import Editor from "../../../src/components/Editor/Editor";
import RamenProvider from "../../../src/context/RamenContext/RamenContext";
import { darkTheme, lightTheme } from "../../../src/themes";
import * as simpleAddition from "../../schemas/simpleAddition";

import MarkdownPreview from "../../utils/MarkdownPreview";
import ThemingIntro from "./ThemingIntro.md";
import ThemingDoc from "./ThemingMain.md";

const pinkTheme = {
  fontName: "Helvetica, Oswald, sans-serif",
  fontSize: "14px",
  borderRadius: "12px",
  borderWidth: "10px",
  textColor: "#FAFCFE",
  textSecondary: "#96A1A9",
  borderColor: "#f774b3",
  editorBackground: "#ffdbe7",
  editorBackgroundMuted: "#db2e6a",
  nodeBackground: "rgb(247, 116, 179, .8)",
  nodeBackgroundSelected: "#333",
  pinBorder: "#f774b3",
  noodleColor: "#db2e6a",
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
          <ThemeProvider theme={lightTheme}>
            <RamenProvider
              editorHeight={400}
              schema={simpleAddition.schema}
              initialGraph={simpleAddition.graph}
            >
              <Editor />
            </RamenProvider>
          </ThemeProvider>
        </ThemeProvider>
      </div>
      <MarkdownPreview text={ThemingDoc} />
    </div>
  );
}

export default Theming;
