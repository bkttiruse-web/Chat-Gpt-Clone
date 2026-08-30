import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChats, setNewChats] = useState([]);
  const [histories, setHistories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/conversations")
      .then((res) => res.json())
      .then((data) => {
        console.log("BACKEND DATA:", data);
        setHistories(data);
      });
  }, []);

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
