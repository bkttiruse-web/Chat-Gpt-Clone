import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="app">
      <Sidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />

      <ChatArea selectedChat={selectedChat} />
    </div>
  );
}

export default App;
