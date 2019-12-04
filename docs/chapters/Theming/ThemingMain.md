The simplest way to customize the look of the editor is by swapping the theme. **ramen** ships with two
themes: **dark** and **light**, by default the light theme is applied.

#### Swapping themes

Ramen uses the _styled-components_ library for styling. You can use styled-components' _ThemeProvider_ to pass a new theme.

This is how you would use the default dark theme:

```jsx
import NodeEditor, { darkTheme } from "ramen";
import { ThemeProvider } from "styled-components";

<ThemeProvider theme={darkTheme}>
  <NodeEditor />
<ThemeProvider>
```

#### Custom themes

You can also create your own theme from scratch or by overridding one of the default themes:

```jsx
import NodeEditor, { lightTheme } from "ramen";
import { ThemeProvider } from "styled-components";

const myTheme = {
  borderWidth: "2px",
  ...lightTheme,
};

<ThemeProvider theme={myTheme}>
  <NodeEditor />
<ThemeProvider>
```

#### Themable properties

| Name | Default Value |
| --- | --- |
| `fontName` | `Helvetica, Oswald, sans-serif` |
| `fontSize` | `14px` |
| `textColor` | `#4A5967` |
| `textColorSecondary` | `#96A1A9` |
| `borderRadius` | `4px` |
| `borderWidth` | `4px` |
| `borderColor` | `#D9E1E7` |
| `editorBackground` | `#FAFCFE` |
| `editorBackgroundMuted` | `#96A1A9` |
| `nodeBackground` | `rgba(238, 242, 245, .8)` |
| `nodeBackgroundSelected` | `-` |
| `pinBorder` | `-` |
| `noodleColor` | `-` |

