"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";

import "highlight.js/styles/default.css";
import hljs from "highlight.js";

// import "./prettify.css";

// This is for if a smaller footrpint is needed see dcumentation
// import javascript from "highlight.js/lib/languages/javascript";
// hljs.registerLanguage("javascript", javascript);

export default function Page({ params }: any) {
  const [snippet, setSnippet] = useState(
    "export default function Page({ params }: any) {\nconst [snippet, setSnippet] = useState(\n'const [snippet, setSnippet] = useState(\"\");'\n);"
  );

  // const getSnippet = async () => {
  //   try {
  //     const res = await fetch(
  //       "http://codesharingplatformwithspringboot-env.eba-kym3bz5b.us-east-1.elasticbeanstalk.com/api/code/" +
  //         params.uuid,
  //       {
  //         method: "get",
  //         mode: "cors",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=utf-8",
  //         }),
  //       }
  //     );
  //     const data = await res.json();

  //     setSnippet(data.code);
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred while making the request");
  //   }
  // };

  // useEffect(() => {
  //   getSnippet();
  // }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const [scriptTag, setScriptTag] = useState("text/javascript");
  // useEffect(() => {
  //   setScriptTag("text/javascript");
  // }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start bg-blue-100 dark:bg-slate-800">
      <Navbar />
      <div className="py-0 flex justify-center flex-col text-xl items-center my-auto">
        <pre>
          <code className="language-js">{snippet}</code>
        </pre>
        {/* <pre className="prettyprint lang-java linenums">{snippet}</pre> */}
      </div>
    </div>
  );
}
