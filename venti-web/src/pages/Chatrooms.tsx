// venti-web/src/pages/ChatRooms.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    name: "🌪️ Stress Support",
    description: "Chat with peers and trained listeners to manage stress and unwind safely.",
  },
  {
    name: "💔 Grief & Loss",
    description: "A safe space to share your feelings, memories, and coping strategies.",
  },
  {
    name: "🌱 Addiction Recovery",
    description: "Supportive community to discuss recovery, challenges, and motivation.",
  },
  {
    name: "📚 Student Life",
    description: "Talk about exams, college stress, relationships, and student experiences.",
  },
];

export default function ChatRooms() {
  const navigate = useNavigate();

  const joinRoom = (room: string) => {
    navigate(`/chatroom/${room}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-indigo-700 mb-2">Welcome to the Chatrooms</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Choose a room that fits your mood or situation. Each room is a safe, anonymous space
          where you can share, listen, and connect with others.
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
            onClick={() => joinRoom(room.name)}
          >
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">{room.name}</h3>
            <p className="text-gray-600 mb-4">{room.description}</p>
            <button className="mt-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow text-sm">
              Enter Room
            </button>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-400 mt-10 max-w-md mx-auto">
        💡 Remember: All interactions are anonymous. Share as much or as little as you feel comfortable.
      </p>
    </div>
  );
}
