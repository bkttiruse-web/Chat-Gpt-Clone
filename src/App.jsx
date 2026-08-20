import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  const [newChats, setNewChats] = useState([]);

  const addNewChat = (message) => {
    const newChat = {
      id: Date.now().toString(),
      title: message,
      message: message,
    };

    setNewChats((prev) => [newChat, ...prev]);

    setSelectedChat(newChat.id);
  };

  return (
    <div className="app">
      <Sidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        newChats={newChats}
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
