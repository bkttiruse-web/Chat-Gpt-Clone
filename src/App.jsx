import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { histories as initialHistories } from "./data/chatHistory";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChats, setNewChats] = useState([]);
  const [histories, setHistories] = useState(initialHistories);

  const addNewChat = (message) => {
    const newChat = {
      id: Date.now(),
      title: message,
      message: message,
    };
    setNewChats((prev) => [newChat, ...prev]);
    setSelectedChat(newChat.id);
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
    <div className="app">
      <Sidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        newChats={newChats}
        histories={histories}
        deleteChat={deleteChat}
        renameChat={renameChat}
      />

      <ChatArea
        selectedChat={selectedChat}
        newChats={newChats}
        onSendMessage={addNewChat}
      />
    </div>
  );
}

export default App;
