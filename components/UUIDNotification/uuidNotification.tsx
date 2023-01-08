import React from "react";

export default function uuidNotification({ uuid }) {
  return (
    <div className="text-center pt-6 lg:px-4 text-2xl">
      <div
        className="py-5 px-7 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span
          id="copy_uuid"
          onClick={() => {
            navigator.clipboard.writeText(uuid);
          }}
          className="px-4 animate-bounce cursor-pointer flex rounded-full bg-indigo-500 uppercase py-1 font-bold mr-3"
        >
          copy uuid
        </span>
        <a
          href={
            "http://codesharingplatformwithspringboot-env.eba-kym3bz5b.us-east-1.elasticbeanstalk.com/code/" +
            uuid
          }
          target="_blank"
        >
          <span className="font-semibold mr-2 text-left flex-auto">
            View your code snippet !
          </span>
        </a>
        <svg
          className="fill-current opacity-75 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 17 17"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </div>
    </div>
  );
}
