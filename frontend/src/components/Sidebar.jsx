import { useState } from "react";
import ChatHistoryItem from "./ChatHistoryItem";

function Sidebar({
  selectedChat,
  onSelectChat,
  newChats = [],
  histories = [],
  deleteChat,
  renameChat,
  pinnedIds = [],
  togglePin,
}) {
  const [search, setSearch] = useState("");

  const allChats = [...newChats, ...histories];

  const filteredChats = allChats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Split into pinned and normal chats
  const pinnedChats = filteredChats.filter((chat) => pinnedIds.includes(chat.id));
  const normalChats = filteredChats.filter((chat) => !pinnedIds.includes(chat.id));

  return (
    <aside className="sidebar">
      {/* TOP */}
      <div className="sidebar-top">
        <div className="GPT">ChatGPT</div>

        <input
          className="sidebar-search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TOOLS */}
      <div className="tools">
        <div className="menu-item">New chat</div>
        <div className="menu-item">Explore</div>
        <div className="menu-item">Library</div>
        <div className="menu-item">GPTs</div>
        <div className="menu-item">Plugins</div>
      </div>

      {/* CHAT HISTORY */}
      <div className="history">
        {filteredChats.length === 0 ? (
          <div className="no-chats">No chats found</div>
        ) : (
          <>
            {/* PINNED section */}
            {pinnedChats.length > 0 && (
              <>
                <div className="history-title">Pinned</div>
                {pinnedChats.map((chat) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    isActive={selectedChat === chat.id}
                    onSelect={() => onSelectChat(chat.id)}
                    onDelete={() => deleteChat(chat.id)}
                    onRename={(newTitle) => renameChat(chat.id, newTitle)}
                    isPinned={true}
                    onTogglePin={() => togglePin(chat.id)}
                  />
                ))}
              </>
            )}

            {/* NORMAL chats section */}
            {normalChats.length > 0 && (
              <>
                <div className="history-title">Chats</div>
                {normalChats.map((chat) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    isActive={selectedChat === chat.id}
                    onSelect={() => onSelectChat(chat.id)}
                    onDelete={() => deleteChat(chat.id)}
                    onRename={(newTitle) => renameChat(chat.id, newTitle)}
                    isPinned={false}
                    onTogglePin={() => togglePin(chat.id)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <div className="account">
          <div className="avatar">B</div>
          <div className="name">Biruck</div>
          <button className="upgrade">Upgrade</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
