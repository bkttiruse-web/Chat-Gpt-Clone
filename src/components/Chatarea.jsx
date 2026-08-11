import { chatHistory } from "../data/chatHistory";
import ChatMessage from "./ChatMessage";

function ChatArea({ selectedChat }) {
  const isGreetingChat =
    selectedChat === "6a70f200-569c-83ea-8d18-af32ff00a7b0";

  const messages = Object.values(chatHistory.mapping)
    .filter((node) => node.message)
    .map((node) => node.message);

  return (
    <main className={`main ${!isGreetingChat ? "welcome-mode" : ""}`}>
      {/* HEADER */}
      <header className="header">
        <h2>{isGreetingChat ? chatHistory.title : "ChatGPT"}</h2>
      </header>

      {/* CONTENT */}
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
          <button className="icon">+</button>

          <input type="text" placeholder="Message ChatGPT" />

          <button className="mic">🎙</button>

          <button className="send">↑</button>
        </div>
      </div>
    </main>
  );
}

export default ChatArea;
