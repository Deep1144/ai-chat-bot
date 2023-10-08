import { IChatObject } from "./ChatBoxWrapper";
import RobotIcon from "../assets/robot-icon.svg";
import PersonIcon from "../assets/person.svg";

type Props = {
  message: IChatObject;
};
function MessageContent(props: Props) {
  const { message } = props;

  return message.role === "assistant" ? (
    <div>
      <div className="flex items-center mb-4">
        <div className="flex-none flex flex-col items-center space-y-1 mr-4">
          <img
            className="rounded-full w-10 h-10 bg-slate-200 p-2"
            src={RobotIcon}
          />
          <a href="#" className="block text-xs hover:underline">
            Bot
          </a>
        </div>
        <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
          <div>{message.content}</div>

          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400" />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex items-center flex-row-reverse mb-4">
        <div className="flex-none flex flex-col items-center space-y-1 ml-4">
          <img
            className="rounded-full w-10 h-10 bg-slate-200 p-2"
            src={PersonIcon}
          />
          <a href="#" className="block text-xs hover:underline">
            Me
          </a>
        </div>
        <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
          <div>{message.content}</div>

          <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100" />
        </div>
      </div>
    </div>
  );
}

export default MessageContent;
