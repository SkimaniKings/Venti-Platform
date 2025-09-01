// venti-web/src/pages/CommunityWall.tsx
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Post {
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Utility to generate consistent color per user
const getColorFromId = (id: string) => {
  const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6"];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function CommunityWall() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null as Socket | null);
  const postsEndRef = useRef(null);

  const userId = localStorage.getItem("venti_user_id") || "anonymous";

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => newSocket.emit("getPosts"));

    newSocket.on("postsUpdate", (updatedPosts: Post[]) => setPosts(updatedPosts));

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    postsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  const submitPost = () => {
    if (!input.trim() || !socket) return;
    socket.emit("newPost", { userId, content: input });
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-2xl shadow-md z-10 mb-4 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-1">🌍 Community Wall</h1>
        <p className="text-gray-600">
          Connect anonymously with our supportive community. Share your thoughts, stories, or encouragements. Every post helps someone feel heard.
        </p>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-24">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No posts yet. Be the first to share your story!</p>
        ) : (
          posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: getColorFromId(post.userId) }}
                >
                  {post.userId.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-600">{post.userId}</p>
                  <span className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{post.content}</p>
              <div className="flex justify-end items-center gap-2">
                <span className="text-xs text-gray-500">❤️ {post.likes}</span>
              </div>
            </div>
          ))
        )}
        <div ref={postsEndRef} />
      </div>

      {/* Sticky Input */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex gap-2 items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your story... (Be kind, supportive & anonymous)"
          rows={2}
          className="flex-1 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
        />
        <button
          onClick={submitPost}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow transition transform hover:-translate-y-0.5"
        >
          Post 📝
        </button>
      </div>
    </div>
  );
}
