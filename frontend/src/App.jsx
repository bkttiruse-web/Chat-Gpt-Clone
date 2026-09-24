import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChats, setNewChats] = useState([]);
  const [pinnedIds, setPinnedIds] = useState([]);
  const handleNewChat = () => {
    setSelectedChat(null);
  };

  const togglePin = (id) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [id, ...prev],
    );
  };
  const [histories, setHistories] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/conversations")
      .then((res) => res.json())
      .then((data) => {
        setHistories(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addNewChat = (backendId) => {
    setSelectedChat(backendId);
  };

  const deleteChat = (id) => {
    setNewChats((prev) => prev.filter((chat) => chat.id !== id));
    setHistories((prev) => prev.filter((chat) => chat.id !== id));
    if (selectedChat === id) setSelectedChat(null);
  };

  const renameChat = (id, newTitle) => {
    setNewChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat,
      ),
    );
    setHistories((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat,
      ),
    );
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Sidebar
          selectedChat={selectedChat}
          onNewChat={handleNewChat}
          onSelectChat={setSelectedChat}
          newChats={newChats}
          histories={histories}
          deleteChat={deleteChat}
          renameChat={renameChat}
          pinnedIds={pinnedIds}
          togglePin={togglePin}
        />

        <ChatArea
          selectedChat={selectedChat}
          newChats={newChats}
          onSendMessage={addNewChat}
          fetchData={fetchData}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

