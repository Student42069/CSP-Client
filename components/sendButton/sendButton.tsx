import "./style.css";

import React, { ReactNode, useState } from "react";

export default function sendButton({ send }: any) {
  const [sendButtonText, setSendButtonText] = useState("SEND");
  const [iconClass, setIconClass] = useState("");
  const [loaderClass, setLoaderClass] = useState(
    "download-loader text-white hidden"
  );
  const [checkMarkClass, setCheckMarkClass] = useState("check-svg hidden");

  function handleSend() {
    setSendButtonText("SENDING");
    setIconClass(iconClass + " hidden");
    setLoaderClass("download-loader text-white");
    setCheckMarkClass("check-svg hidden");
  }

  function handleAnimationEnd() {
    setLoaderClass("download-loader text-white hidden");
    setCheckMarkClass("check-svg");
    setSendButtonText("SENT");
    send();
  }

  return (
    <button
      onAnimationEnd={handleAnimationEnd}
      onClick={handleSend}
      className="download-button transform active:scale-95 bg-green-500 hover:bg-green-700 text-white px-16 py-6 rounded-lg font-bold tracking-widest"
    >
      <div className="flex justify-center items-center relative">
        <div className="svg-container">
          <svg
            className={iconClass}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="25"
            height="25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <div className={loaderClass}></div>

          <svg
            className={checkMarkClass}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="button-copy pl-2 leading-none uppercase">
          {sendButtonText}
        </div>
      </div>
    </button>
  );
}
