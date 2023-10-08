import React from "react";

type Props = {
  quickReplies: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage: (_e: any, message: string) => Promise<void>;
};
function QuickReplies(props: Props) {
  const { quickReplies, sendMessage } = props;
  return (
    <>
      {quickReplies.length ? (
        <div className="">
          <div className="w-full flex items-center flex-row-reverse mb-1 text-xs text-gray-600 italic">
            Quick replies
          </div>
          {quickReplies.map((reply) => {
            return (
              <div
                key={reply}
                className="w-full flex items-center flex-row-reverse mb-1 cursor-pointer"
                onClick={(e) => sendMessage(e, reply)}
              >
                <div
                  className="flex-1 max-w-[60%]  p-2  mb-1 relative
                    inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                >
                  <div>{reply}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default QuickReplies;
