import { chatHistory } from "../data/chatHistory";
import ChatMessage from "./ChatMessage";

function ChatArea() {
  return (
    <main className="main">
      <header className="header">
        <h2>ChatGPT</h2>
      </header>

      <section className="content">
        <h1>Ready when you are.</h1>
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
