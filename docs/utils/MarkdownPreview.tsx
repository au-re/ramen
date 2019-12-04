import "./MarkdownPreview.css";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock(props) {
  const { language = null, value } = props;
  return (
    <SyntaxHighlighter language={language} style={materialLight}>
      {value}
    </SyntaxHighlighter>
  );
}

function MarkdownPreview(props: any) {
  const { text = "" } = props;
  return (
    <div className="richtext">
      <ReactMarkdown
        source={text}
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
      />
    </div>
  );
}

export default MarkdownPreview;
