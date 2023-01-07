import "./style.css";

import React, { useState } from "react";

export default function clearButton({ clear }) {
  const [sendButtonText, setSendButtonText] = useState("CLEAR");
  const [iconClass, setIconClass] = useState("");
  const [loaderClass, setLoaderClass] = useState(
    "download-loader text-white hidden"
  );
  const [checkMarkClass, setCheckMarkClass] = useState("check-svg hidden");

  function handleSend() {
    setSendButtonText("CLEARING");
    setIconClass(iconClass + " hidden");
    setLoaderClass("download-loader text-white");
    setCheckMarkClass("check-svg hidden");
  }

  function handleAnimationEnd() {
    setLoaderClass("download-loader text-white hidden");
    setCheckMarkClass("check-svg");
    setSendButtonText("CLEARED");
  }

  return (
    <button
      onAnimationEnd={handleAnimationEnd}
      onClick={clear}
      className="cursor-pointer  download-button transform active:scale-95 bg-red-500 hover:bg-red-700 text-white px-16 py-6 rounded-lg font-bold tracking-widest"
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
