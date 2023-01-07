"use client";

import React, { useRef, useState } from "react";
import ClearButton from "../../components/clearButton/clearButton";
import PasteButton from "../../components/pasteButton/pasteButton";
import SendButton from "../../components/sendButton/sendButton";

interface FormState {
  code: string;
  timeLimit: string;
  viewsLimit: string;
}

export default function New() {
  const [state, setState] = useState<FormState>({
    code: "",
    timeLimit: "",
    viewsLimit: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     let object = {
  //       code: state.code,
  //       time: state.timeLimit == "" ? 0 : parseInt(state.timeLimit),
  //       views: state.viewsLimit == "" ? 0 : parseInt(state.viewsLimit),
  //     };
  //     const res = await fetch(
  //       "http://codesharingplatformwithspringboot-env.eba-kym3bz5b.us-east-1.elasticbeanstalk.com/api/code/new",
  //       {
  //         method: "post",
  //         body: JSON.stringify(object),
  //         mode: "cors",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=utf-8",
  //         }),
  //       }
  //     );
  //     const data = await res.json();
  //     setMessage(data.id);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("An error occurred while making the request");
  //   }
  // };

  const handleClear = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState({ code: "", timeLimit: "", viewsLimit: "" });
    setMessage("");
  };

  let x: number = 0;
  const testSend = () => {
    x++;
    console.log("Sending !!!" + x);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handlePaste() {
    if (
      textareaRef.current &&
      navigator.clipboard &&
      navigator.clipboard.readText
    ) {
      // `navigator.clipboard.readText` is supported
      navigator.clipboard.readText().then((text) => {
        textareaRef.current.value = text;
      });
    } else {
      // `navigator.clipboard.readText` is not supported
      textareaRef.current && textareaRef.current.focus();
      document.execCommand("paste");
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-blue-100">
      <div className="flex justify-center flex-col w-3/5 h-3/4 text-xl">
        <textarea
          placeholder="Write (Copy/Paste) your code here :"
          ref={textareaRef}
          name="code"
          value={state.code}
          onChange={handleChange}
          className=" h-1/2 caret-purple-500 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="grid gap-6 my-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              name="viewsLimit"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Time Limit"
              value={state.viewsLimit}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="timeLimit"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Views Limit"
              value={state.timeLimit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <SendButton send={testSend} />
          <PasteButton paste={handlePaste} />
          <ClearButton clear={handleClear} />
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
