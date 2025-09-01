// venti-web/src/pages/ChatroomSelection.jsx
import { useNavigate } from "react-router-dom";

const rooms = [
  { id: "stress", title: "😰 Stress Support", desc: "Talk about daily stress." },
  { id: "grief", title: "💔 Grief Support", desc: "Share and heal together." },
  { id: "addiction", title: "🍃 Addiction Recovery", desc: "Find encouragement." },
  { id: "student", title: "📚 Student Life", desc: "School, exams & more." },
];

export default function ChatroomSelection() {
  const navigate = useNavigate();

  const handleJoinRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        💬 Choose a Chatroom
      </h2>
      <div className="grid gap-6 md:grid-cols-2 max-w-3xl w-full">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
            onClick={() => handleJoinRoom(room.id)}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {room.title}
            </h3>
            <p className="text-gray-600">{room.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
