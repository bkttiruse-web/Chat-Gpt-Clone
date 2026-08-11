import { Paperclip, Microphone, PaperPlaneTilt } from "@phosphor-icons/react";
import { chatHistory } from "../data/chatHistory";
import ChatMessage from "./ChatMessage";

function ChatArea({ selectedChat }) {
  const isGreetingChat =
    selectedChat === "6a70f200-569c-83ea-8d18-af32ff00a7b0";

  const messages = Object.values(chatHistory.mapping)
    .filter((node) => node.message)
    .map((node) => node.message);

  return (
    <div className="main">
      {/* HEADER */}
      <div className="header">
        <h2>ChatGPT</h2>
      </div>

      {/* CHAT CONTENT */}
      <div className="content">
        {isGreetingChat ? (
          <div className="messages-container">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <div className="welcome">
            <h1>Ready when you are.</h1>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="input-area">
        <div className="input-bar">
          <button className="icon">
            <Paperclip size={22} />
          </button>

          <input type="text" placeholder="Ask anything" />

          <button className="mic">
            <Microphone size={22} />
          </button>

          <button className="send">
            <PaperPlaneTilt size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
