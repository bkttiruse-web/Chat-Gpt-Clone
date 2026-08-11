function ChatMessage({ message }) {
  const role = message.author.role;

  const text = message.content.parts.join("");

  return (
    <div className={`message ${role}`}>
      <div className="msg-avatar">{role === "user" ? "B" : "AI"}</div>

      <div className="bubble">
        <div className="message-label">
          {role === "user" ? "You" : "ChatGPT"}
        </div>

        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
