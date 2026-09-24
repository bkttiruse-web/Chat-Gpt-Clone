import { useState, useEffect, useRef } from "react";
import { Paperclip, Microphone, PaperPlaneTilt } from "@phosphor-icons/react";

const API_URL = "http://localhost:3000";

function ChatArea({ fetchData, selectedChat, onSendMessage }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cache messages per chat so switching away and back preserves them
  const messageCacheRef = useRef({});
  // Backend conversation ID for the current chat
  const convIdRef = useRef(null);
  // Skip next useEffect to prevent wiping messages during first-message flow
  const skipEffectRef = useRef(false);
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };

    recognition.start();
  };

  // Save messages to cache whenever they update
  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      messageCacheRef.current[selectedChat] = messages;
    }
  }, [messages, selectedChat]);

  // Load messages when selected chat changes
  useEffect(() => {
    if (skipEffectRef.current) {
      skipEffectRef.current = false;
      return;
    }

    if (!selectedChat) {
      setMessages([]);
      convIdRef.current = null;
      return;
    }

    // Check cache first (for switching back to a chat you already opened)
    if (messageCacheRef.current[selectedChat]?.length > 0) {
      setMessages(messageCacheRef.current[selectedChat]);
      convIdRef.current = selectedChat;
      return;
    }

    // Fetch conversation from backend (works for both hardcoded history and Ollama chats)
    convIdRef.current = selectedChat;
    setMessages([]);
    fetch(`${API_URL}/conversations/${selectedChat}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mapping) {
          const msgs = Object.values(data.mapping)
            .map((node) => node.message)
            .filter((m) => m !== null)
            .map((m) => ({
              role: m.author.role,
              content: m.content.parts.join(""),
            }));
          setMessages(msgs);
        }
      })
      .catch(() => {});
  }, [selectedChat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    const isFirstMessage = !selectedChat;

    // Optimistically show user message
    setMessages((prev) => [...prev, { role: "user", content: currentMessage }]);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentMessage,
          conversationId: convIdRef.current,
        }),
      });
      const data = await res.json();

      // Add AI reply
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      // First message: backend already created the sidebar entry, refresh and select it
      if (isFirstMessage && data.conversationId) {
        convIdRef.current = data.conversationId;
        skipEffectRef.current = true;
        fetchData();
        onSendMessage(data.conversationId);
      }
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

          <button className="mic" onClick={handleVoice}>
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
