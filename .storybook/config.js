import { addParameters, configure } from '@storybook/react';
import { create } from "@storybook/theming";

addParameters({
  options: {
    theme: create({
      base: "light",
      brandTitle: "ramen",
      brandUrl: "https://github.com/au-re/ramen"
    }),
  },
});

// automatically import all files ending in *.story.tsx
const req = require.context('../src', true, /\.story\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
