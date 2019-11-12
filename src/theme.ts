import styledTheme from "styled-theming";

import colors from "./colors";

const theme = {

  background: styledTheme("mode", {
    light: colors.background,
    dark: colors.backgroundDark,
  }),

  backgroundSecondary: styledTheme("mode", {
    light: colors.menu,
    dark: colors.menuDark,
  }),

  backgroundTertiary: styledTheme("mode", {
    light: colors.submenu,
    dark: colors.submenuDark,
  }),

  textPrimary: styledTheme("mode", {
    light: colors.font,
    dark: colors.font2,
  }),

  textSecondary: styledTheme("mode", {
    light: colors.font1,
    dark: colors.font1,
  }),

  textTertiary: styledTheme("mode", {
    light: colors.font2,
    dark: colors.font,
  }),

  borderColor: styledTheme("mode", {
    light: colors.border,
    dark: colors.borderDark,
  }),

  borderHighlight: styledTheme("mode", {
    light: colors.font1,
    dark: colors.font1,
  }),

  backgroundDisabled: styledTheme("mode", {
    light: colors.backgroundDisabled,
    dark: colors.backgroundDisabledDark,
  }),
};

export default theme;
