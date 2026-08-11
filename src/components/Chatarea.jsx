import { chatHistory } from "../data/chatHistory";
import ChatMessage from "./ChatMessage";

function ChatArea() {
  const messages = Object.values(chatHistory.mapping)
    .filter((node) => node.message)
    .map((node) => node.message);

  return (
    <main className="main">
      <header className="header">
        <h2>ChatGPT</h2>
      </header>

      <section className="content">
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </section>

      <div className="input-area">
        <div className="input-bar">
          <button className="icon" title="Upload">
            +
          </button>

          <input type="text" placeholder="Ask anything" />

          <button className="mic" title="Voice input">
            🎤
          </button>

          <button className="send" title="Send">
            ↑
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChatArea;
