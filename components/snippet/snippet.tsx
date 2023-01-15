import React, { useEffect } from "react";

import "prismjs/themes/prism-okaidia.css";
import Prism from "prismjs";

export default function Snippet({ code }: any) {
  useEffect(() => {
    const highlight = async () => {
      Prism.highlightAll();
    };
    highlight();
  }, [code]);

  return (
    <pre id="code_snippet">
      <code className="language-js">{code}</code>
    </pre>
  );
}
