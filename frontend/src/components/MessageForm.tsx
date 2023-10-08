import React, { RefObject } from "react";
import SendIcon from "../assets/send-fill.svg";
import LoadingAnimation from "./LoadingAnimation";

type Props = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage: (_e: any, message: string) => Promise<void>;
  inputFieldRef: RefObject<HTMLInputElement>
};

function MessageForm(props: Props) {
  const { message, setMessage, isTyping, sendMessage, inputFieldRef } = props;

  return (
    <div className="flex items-center border-t p-2">
      <div className="w-full mx-2">
        <form action="" onSubmit={(e) => sendMessage(e, message)}>
          <input
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Aa"
            autoFocus
            onChange={(e) => setMessage(e.target.value)}
            ref={inputFieldRef}
            value={message}
          />
        </form>
      </div>

      <div className="w-10">
        {isTyping ? (
          <LoadingAnimation />
        ) : (
          <button
            className="inline-flex hover:bg-indigo-50 rounded-full p-2"
            type="button"
            onClick={(e) => sendMessage(e, message)}
          >
            <img src={SendIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageForm;
