function ChatHistoryItem({ chat }) {
  return (
    <div className="history-item" title={chat.title}>
      {chat.title}
    </div>
  );
}

export default ChatHistoryItem;
