import { useState } from "react";
import { Paperclip, Microphone, PaperPlaneTilt } from "@phosphor-icons/react";

import { chatHistories } from "../data/chatHistory";
import ChatMessage from "./ChatMessage";

function ChatArea({ selectedChat, newChats = [], onSendMessage }) {
  const [message, setMessage] = useState("");

  const selectedConversation = chatHistories.find(
    (chat) => chat.conversation_id === selectedChat,
  );

  const selectedNewChat = newChats.find((chat) => chat.id === selectedChat);

  const messages = selectedConversation
    ? Object.values(selectedConversation.mapping)
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
        ) : selectedConversation ? (
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

          <button
            className="send"
            onClick={() => {
              if (message.trim() === "") return;

              onSendMessage(message);
              setMessage("");
            }}
          >
            <PaperPlaneTilt size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
