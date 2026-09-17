import { useState, useEffect } from "react";
import { Paperclip, Microphone, PaperPlaneTilt } from "@phosphor-icons/react";

import ChatMessage from "./ChatMessage";
const API_URL = "http://localhost:3000";

function ChatArea({ fetchData, selectedChat, newChats = [], onSendMessage }) {
  const handleSend = async () => {
    const request = {
      messages: message,
    };
    console.log("sakn", request);

    const response = await fetch(`${API_URL}/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request), // Converts JavaScript object to a JSON string
    });
    fetchData();
    console.log(response);
    const send = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat: message }),
      model: "llama 3.2:3b",
      message: [
        {
          role: "user",
          content: "hi",
        },
      ],
    });
  };

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  // useEffect(() => {
  //   if (!selectedChat) return;

  //   fetch(`http://localhost:3000/conversations/${selectedChat}`)
  //     .then((res) => res.json())
  //     .then((data) => setConversation(data));
  // }, [selectedChat]);

  const selectedNewChat = newChats.find((chat) => chat.id === selectedChat);

  const messages = conversation
    ? Object.values(conversation.mapping)
        .map((node) => node.message)
        .filter((message) => message !== null)
    : [];

  return (
    <div className="main">
      {/* HEADER */}
      <div className="header">
        <h2>ChatGPT</h2>
      </div>

      {/* CHAT CONTENT */}
      <div className="content">
        {selectedNewChat ? (
          <div className="messages-container">
            <div className="message user">
              <div className="msg-avatar">B</div>

              <div className="bubble">
                <div className="message-label">You</div>

                <div className="message-text">{selectedNewChat.message}</div>
              </div>
            </div>
          </div>
        ) : conversation ? (
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

          <input
            type="text"
            placeholder="Message ChatGPT..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="mic">
            <Microphone size={22} />
          </button>

          <button className="send" onClick={handleSend}>
            <PaperPlaneTilt size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
