// venti-web/src/pages/ChatRoom.tsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // backend URL

interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

export default function ChatRoom({ roomName }: { roomName: string }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("venti_user_id") || "anonymous";

  useEffect(() => {
    socket.emit("joinRoom", roomName);

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [roomName]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("chatMessage", { room: roomName, userId, message: input });
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="p-6 bg-indigo-100 border-b border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-700">{roomName} Chatroom</h2>
        <p className="text-gray-600 mt-1">
          💬 This is a safe, anonymous space. Share your thoughts, support others, or just listen.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xs p-3 rounded-2xl shadow-sm ${
              m.userId === userId
                ? "bg-indigo-100 self-end text-right"
                : "bg-white self-start"
            }`}
          >
            <p className="text-xs text-gray-500 font-medium mb-1">{m.userId}</p>
            <p className="text-gray-700">{m.message}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">
              {new Date(m.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
