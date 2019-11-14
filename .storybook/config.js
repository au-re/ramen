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
const reqInternal = require.context('../src', true, /\.story\.tsx$/);
const reqDocs = require.context('../docs', true, /\.story\.(tsx|mdx)$/);

function loadStories() {
  reqDocs.keys().sort().forEach(filename => reqDocs(filename));
  reqInternal.keys().forEach(filename => reqInternal(filename));
}

configure(loadStories, module);
