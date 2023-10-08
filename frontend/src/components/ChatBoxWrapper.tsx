import { useCallback, useEffect, useState } from "react";
import ChevronDown from "../assets/chevron-down.svg";
import MessageForm from "./MessageForm";
import QuickReplies from "./QuickReplies";
import MessageContent from "./MessageContent";
import { BACKEND_BASE_URL } from "../core/constants";

export type IChatObject = {
  content: string;
  role?: "assistant" | "user";
};

function ChatBox() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<IChatObject[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [defaultMessage] = useState<IChatObject[]>([
    {
      content: `Hi, I'm your AI design partner, from crafting layouts from scratch to generating original content, I've got you covered.
      Simply give me a word and watch your ideas come to life. Note: I'm in beta so patience is appreciated.`,
      role: "assistant",
    },
    // {
    //   content: `Hi, I'm your AI design partner, from crafting layouts from scratch to generating original content, I've got you covered.
    //   Simply give me a word and watch your ideas come to life. Note: I'm in beta so patience is appreciated.`,
    //   role: "assistant",
    // },
    // {
    //   content: `Hi, I'm your AI design partner, from crafting layouts from scratch to generating original content, I've got you covered.
    //   Simply give me a word and watch your ideas come to life. Note: I'm in beta so patience is appreciated.`,
    //   role: "assistant",
    // },
    // {
    //   content: `Hi, I'm your AI design partner, from crafting layouts from scratch to generating original content, I've got you covered.
    //   Simply give me a word and watch your ideas come to life. Note: I'm in beta so patience is appreciated.`,
    //   role: "assistant",
    // },
  ]);
  const [quickReplies, setQuickReplies] = useState([
    // "Hello! How can I assist you today?",
    // "Hello! How can I assist you today?",
    // "Hello! How can I assist you today?",
    // "Hello! How can I assist you today?",
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = async (e: any, message: string) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    const msgs = chats;
    msgs.push({
      role: "user",
      content: message,
    });
    setChats(msgs);
    setMessage("");
    setQuickReplies([]);

    try {
      const response = await fetch(BACKEND_BASE_URL + "chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message);
      }

      msgs.push(data.output.message);
      setChats(msgs);
      setQuickReplies(data.quick_replies);
      setIsTyping(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsTyping(false);
      setError(error.message);
      scrollTo(0, 1e10);
    }
  };

  const toggleChatVisibility = useCallback(
    () => setIsChatVisible(!isChatVisible),
    [isChatVisible]
  );

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.target instanceof Element) {
        const localName = event.target.localName;
        if (localName === "input") {
          return;
        }
      }

      switch (event.code) {
        case "Slash":
          toggleChatVisibility();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keyup", keyboardHandler);

    return () => {
      document.removeEventListener("keyup", keyboardHandler);
    };
  }, [toggleChatVisibility]);

  return (
    <div className="h-screen ">
      <div
        className={`absolute right-4 md:right-10 bottom-28 h-2/3  w-4/5 md:w-2/3 lg:w-1/2 flex flex-col border shadow-md bg-white ${
          isChatVisible ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center justify-center flex-grow">
            <div className="font-medium">AI Assistant</div>
          </div>

          <div>
            <button
              className="inline-flex hover:bg-indigo-50 rounded-full p-2"
              type="button"
              onClick={toggleChatVisibility}
            >
              <img src={ChevronDown} />
            </button>
          </div>
        </div>
        <div className="flex-1 px-4 py-4 overflow-y-auto no-scrollbar">
          {[...defaultMessage, ...chats].map((message, i) => {
            return (
              <MessageContent
                message={message}
                key={i + message.content + message.role}
              />
            );
          })}
          <QuickReplies quickReplies={quickReplies} sendMessage={sendMessage} />
        </div>

        {error && (
          <div
            className="bg-red-100 px-4 mx-5 border border-red-400 text-red-700  py-2 my-1.5 rounded text-xs relative"
            role="alert"
          >
            <p className="">{error}</p>
          </div>
        )}

        <MessageForm
          isTyping={isTyping}
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
      <div className="absolute bottom-10 right-4 md:right-10">
        <button
          className="mt-10 rounded-md text-lg bg-indigo-50 px-3 py-2 font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={toggleChatVisibility}
        >
          Press / to start
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
