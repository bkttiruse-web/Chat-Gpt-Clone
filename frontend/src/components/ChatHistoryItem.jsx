import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function ChatHistoryItem({
  chat,
  isActive,
  onSelect,
  onDelete,
  onRename,
  isPinned,
  onTogglePin,
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(chat.title);

  function handleRenameSubmit() {
    if (renameValue.trim() !== "") {
      onRename(renameValue.trim());
    }
    setIsRenaming(false);
    setMenuOpen(false);
  }

  function handleRenameKeyDown(e) {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setRenameValue(chat.title);
      setIsRenaming(false);
      setMenuOpen(false);
    }
  }

  return (
    <div
      className={`history-item ${isActive ? "active" : ""}`}
      onClick={() => {
        if (!isRenaming) onSelect();
      }}
    >
      {isRenaming ? (
        <input
          className="rename-input"
          value={renameValue}
          autoFocus
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setRenameValue(e.target.value)}
          onBlur={handleRenameSubmit}
          onKeyDown={handleRenameKeyDown}
        />
      ) : (
        <span className="history-item-title">{chat.title}</span>
      )}

      {/* Three-dot button */}
      <button
        className="menu-dots"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
      >
        ⋮
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="dropdown">
          {/* Pin / Unpin */}
          <button
            className="dropdown-item"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              onTogglePin();
            }}
          >
            {isPinned ? "Unpin" : "Pin"}
          </button>

          <button
            className="dropdown-item"
            onClick={(e) => {
              e.stopPropagation();
              setRenameValue(chat.title);
              setIsRenaming(true);
              setMenuOpen(false);
            }}
          >
            Rename
          </button>
          <button
            className="dropdown-item dropdown-item-delete"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatHistoryItem;
