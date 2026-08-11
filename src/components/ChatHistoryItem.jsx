function ChatHistoryItem({ chat, onClick }) {
  return (
    <div className="history-item" onClick={onClick} title={chat.title}>
      {chat.title}
    </div>
  );
}

export default ChatHistoryItem;
