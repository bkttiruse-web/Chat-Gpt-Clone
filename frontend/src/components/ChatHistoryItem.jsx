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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="menu-dots" onClick={(e) => e.stopPropagation()}>
            ⋮
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
          >
            {isPinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRenameValue(chat.title);
              setIsRenaming(true);
            }}
          >
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ChatHistoryItem;
