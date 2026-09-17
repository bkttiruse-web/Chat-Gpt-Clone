import { useState, useEffect } from "react";
import { Paperclip, Microphone, PaperPlaneTilt } from "@phosphor-icons/react";
import ChatMessage from "./ChatMessage";

const API_URL = "http://localhost:3000";

function ChatArea({ fetchData, selectedChat, newChats = [], onSendMessage }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // When selected chat changes, reset message thread or load history
  useEffect(() => {
    if (!selectedChat) return;

    const isNewChat = newChats.find((chat) => chat.id === selectedChat);
    if (isNewChat) {
      setConversation(null);
      // Restore messages for this new chat if they exist
      setMessages(isNewChat.messages || []);
      return;
    }

    // History chat — fetch from backend
    setMessages([]);
    fetch(`${API_URL}/conversations/${selectedChat}`)
      .then((res) => res.json())
      .then((data) => setConversation(data));
  }, [selectedChat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    const isFirstMessage = !selectedChat;

    if (isFirstMessage) {
      onSendMessage(currentMessage);
    }

    setMessages((prev) => [...prev, userMessage]);

    try {
      if (isFirstMessage) {
        fetch(`${API_URL}/conversations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: currentMessage }),
        }).catch((err) => console.error("Failed to persist conversation", err));
      }

      // 2. Get Ollama reply
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });
      const data = await res.json();

      const aiMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Send failed:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: could not reach Ollama." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Messages from a history conversation
  const historyMessages =
    conversation && conversation.mapping
      ? Object.values(conversation.mapping)
          .map((node) => node.message)
          .filter((m) => m !== null)
      : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main">
      {/* HEADER */}
      <div className="header">
        <h2>ChatGPT</h2>
      </div>

      {/* CHAT CONTENT */}
      <div className="content">
        {messages.length > 0 ? (
          <div className="messages-container">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                <div className="msg-avatar">
                  {msg.role === "user" ? "B" : "AI"}
                </div>
                <div className="bubble">
                  <div className="message-label">
                    {msg.role === "user" ? "You" : "ChatGPT"}
                  </div>
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="msg-avatar">AI</div>
                <div className="bubble">
                  <div className="message-label">ChatGPT</div>
                  <div className="message-text" style={{ color: "#8e8ea0" }}>
                    Thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : conversation && conversation.mapping ? (
          <div className="messages-container">
            {historyMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
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

          <input
            type="text"
            placeholder="Message ChatGPT..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="mic">
            <Microphone size={22} />
          </button>

          <button className="send" onClick={handleSend} disabled={isLoading}>
            <PaperPlaneTilt size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
