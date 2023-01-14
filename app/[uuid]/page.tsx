"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Snippet from "../../components/snippet/snippet";

export default function Page({ params }: any) {
  const [snippet, setSnippet] = useState(<Snippet code={""} />);

  const getSnippet = async () => {
    try {
      const res = await fetch(
        "http://codesharingplatformwithspringboot-env.eba-kym3bz5b.us-east-1.elasticbeanstalk.com/api/code/" +
          params.uuid,
        {
          method: "get",
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
          }),
        }
      );
      const data = await res.json();
      setSnippet(<Snippet code={data.code} />);
    } catch (error) {
      console.error(error);
      alert("An error occurred while making the request");
      setSnippet(<Snippet code={"default code();"} />);
    }
  };

  useEffect(() => {
    getSnippet();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start bg-blue-100 dark:bg-slate-800">
      <Navbar />
      <div className="py-0 flex justify-center flex-col text-m items-center my-auto">
        {snippet}
      </div>
    </div>
  );
}
