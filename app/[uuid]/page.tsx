"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Snippet from "../../components/snippet/snippet";

import "./style.css";

export default function Page({ params }: any) {
  const [snippet, setSnippet] = useState(<Snippet code={""} />);
  const [date, setDate] = useState("");

  const getSnippet = async () => {
    try {
      const res = await fetch(
        "https://codesharingplatform.com/api/code/" + params.uuid,
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
      setDate(data.date);
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
    <div className="min-h-screen flex-col flex justify-start bg-slate-900 ">
      <Navbar />
      <div className="flex flex-col text-xl mx-auto my-14 w-min p-10 pb-5 ring-offset-0 rounded-3xl shadow-2xl shadow-blue-500/50 bg-slate-500">
        {/* <div className="flex flex-col text-xl  m-auto bg-slate-400 w-min p-24 outline outline-offset-2 outline-cyan-500 outline-dashed"> */}
        {snippet}
        <div className="text-xl font-sans font-light uppercase flex justify-end">
          <p className="whitespace-nowrap">
            Uploaded on{" "}
            <span className="font-semibold">{date.split(" ")[0]}</span> at{" "}
            <span className="font-semibold">{date.split(" ")[1]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
