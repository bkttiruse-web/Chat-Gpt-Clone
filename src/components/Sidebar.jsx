function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2 className="GPT">ChatGPT</h2>

        <input
          type="text"
          className="sidebar-search"
          placeholder="Search..."
          aria-label="Search chats"
        />
      </div>

      <div className="tools">
        <div className="menu-item">+ New Chat</div>
        <div className="menu-item">Images</div>
        <div className="menu-item">Library</div>
        <div className="menu-item">GPTs</div>
        <div className="menu-item">Plugins</div>
      </div>

      <div id="history" className="history"></div>

      <div className="bottom">
        <div className="account">
          <div className="avatar">B</div>
          <span className="name">Biruck</span>
          <button className="upgrade">Upgrade</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
