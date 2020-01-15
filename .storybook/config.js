import { addParameters, configure } from '@storybook/react';
import { create } from "@storybook/theming";

addParameters({
  options: {
    theme: create({
      base: "light",
      brandTitle: "ramen",
      brandUrl: "https://github.com/au-re/ramen",
      brandImage: "https://raw.githubusercontent.com/au-re/ramen/master/assets/ramen.png",
    }),
  },
});
