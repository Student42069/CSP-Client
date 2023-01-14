import React, { useEffect } from "react";

// import "./prettify.css";
// import "./prettify.js";

// import "./prism.css";
// import "./prism.js";

import "prismjs/themes/prism-twilight.css";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

export default function Snippet({ code }: any) {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [code]);

  return (
    <pre>
      <code className="language-javascript ">{code}</code>
    </pre>
  );
}
