"use client";

import React, { useRef, useState } from "react";
import ClearButton from "../../components/clearButton/clearButton";
import Navbar from "../../components/navbar/navbar";
import PasteButton from "../../components/pasteButton/pasteButton";
import SendButton from "../../components/sendButton/sendButton";
import UUIDNotification from "../../components/UUIDNotification/uuidNotification";

import "./new.css";

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
  const [uuid, setUUID] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    setTrigger((trigger) => trigger + 1);
    setUUID("");
  };

  const handleSubmit = async () => {
    try {
      let object = {
        code: state.code,
        time: state.timeLimit == "" ? 0 : parseInt(state.timeLimit),
        views: state.viewsLimit == "" ? 0 : parseInt(state.viewsLimit),
      };
      const res = await fetch(
        "http://codesharingplatformwithspringboot-env.eba-kym3bz5b.us-east-1.elasticbeanstalk.com/api/code/new",
        {
          method: "post",
          body: JSON.stringify(object),
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
          }),
        }
      );
      const data = await res.json();
      setUUID(data.id);
    } catch (error) {
      console.error(error);
      setUUID("An error occurred while making the request");
    }
  };

  const handleClear = () => {
    setState({ code: "", timeLimit: "", viewsLimit: "" });
    setUUID("");
  };

  let x: number = 0;
  const testSend = () => {
    x++;
    console.log("Sending !!!" + x);
    setUUID("uuid received");
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

  const [trigger, setTrigger] = useState(0);

  return (
    <div className="min-h-screen flex flex-col justify-start bg-blue-100 dark:bg-slate-800">
      <Navbar />
      <div className="py-0 flex justify-center flex-col text-xl items-center my-auto">
        <textarea
          placeholder="Write (Copy/Paste) your code here :"
          ref={textareaRef}
          name="code"
          value={state.code}
          onChange={handleChange}
          className="caret-purple-500 p-2.5 w-3/5 min-h-[40vh] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="grid gap-6 mt-6 md:grid-cols-2 w-3/5">
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
        {uuid && <UUIDNotification uuid={uuid} />}
        <div className="flex justify-center mt-6 flex-col sm:flex-row">
          <SendButton send={testSend} trigger={trigger} />
          <PasteButton paste={handlePaste} />
          <ClearButton clear={handleClear} trigger={trigger} />
        </div>
      </div>
    </div>
  );
}
