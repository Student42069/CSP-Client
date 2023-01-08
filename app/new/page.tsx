"use client";

import "./new.css";

import React, { useRef, useState } from "react";
import ClearButton from "../../components/clearButton/clearButton";
import PasteButton from "../../components/pasteButton/pasteButton";
import SendButton from "../../components/sendButton/sendButton";
import UUIDNotification from "../../components/UUIDNotification/uuidNotification";

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
  const [uuid, setUUID] = useState("l");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    setTrigger((trigger) => trigger + 1);
    setUUID("");
  };

  const handleSubmit = async () => {
    // event.preventDefault();
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

  const handleClear = (event: React.FormEvent<HTMLButtonElement>) => {
    // event.preventDefault();
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
    <div className="flex justify-center items-center w-screen h-screen bg-blue-100">
      <div className="flex justify-center flex-col w-3/5 h-3/4 text-xl">
        <textarea
          placeholder="Write (Copy/Paste) your code here :"
          ref={textareaRef}
          name="code"
          value={state.code}
          onChange={handleChange}
          className=" h-2/3 caret-purple-500 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="grid gap-6 mt-6 md:grid-cols-2">
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
        <div className="flex justify-center my-6">
          <SendButton send={testSend} trigger={trigger} />
          <PasteButton paste={handlePaste} />
          <ClearButton clear={handleClear} trigger={trigger} />
        </div>
      </div>
    </div>
  );
}
