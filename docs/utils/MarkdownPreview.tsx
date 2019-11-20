import "highlight.js/styles/monokai.css";
import "./MarkdownPreview.css";

import highlighter from "highlight.js/lib/highlight";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";

import md from "markdown-it";
import React from "react";

highlighter.registerLanguage("json", json);
highlighter.registerLanguage("javascript", javascript);
highlighter.registerLanguage("bash", bash);

const markdown = md({
  html: true,
  highlight: (str, lang) => {
    if (!lang || !highlighter.getLanguage(lang)) return "";
    try {
      return `<pre class="hljs"><code>${highlighter.highlight(lang, str, true).value}</code></pre>`;
    } catch (err) {
      throw err;
    }
  },
});

function MarkdownPreview(props: any) {
  const { text = "", ...rest } = props;
  const html = markdown.render(text);
  return (<div {...rest} className="richtext" dangerouslySetInnerHTML={{ __html: html }} />);
}

export default MarkdownPreview;
