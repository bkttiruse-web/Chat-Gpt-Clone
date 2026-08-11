import { useState } from "react";
import { histories } from "../data/chatHistory";

function Sidebar() {
  const [search, setSearch] = useState("");

  const filteredHistories = histories.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

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
      </div>

      {/* CHAT HISTORY */}
      <div className="history">
        {filteredHistories.length === 0 ? (
          <div className="no-chats">No chats found</div>
        ) : (
          <>
            <div className="history-title">Chats</div>

            {filteredHistories.map((chat) => (
              <div className="history-item" key={chat.id}>
                {chat.title}
              </div>
            ))}
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
