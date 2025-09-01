// venti-web/src/pages/AIAssistant.tsx
import { useState, useEffect, useRef } from "react";

export default function AIAssistant() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState<{ mood: string; advice: string } | null>(null); 
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("venti_user_id");
    setUserId(id || null);

    setMessages([
      { sender: "AI", text: "🌬️ Hi! I'm your AI assistant. How are you feeling today?" },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (msg?: string) => {
    const text = msg ?? input;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "User", text }]);

    try {
      // AI Chat reply
      const chatRes = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, user_id: userId }),
      });
      const chatData = await chatRes.json();

      // Mood analysis
      const moodRes = await fetch("http://localhost:5000/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, user_id: userId }),
      });
      const moodData = await moodRes.json();
      setMood(moodData);

      // Append AI messages
      setMessages(prev => [
        ...prev,
        { sender: "AI", text: chatData.reply },
        { sender: "AI", text: `📝 Mood detected: ${moodData.mood}. Advice: ${moodData.advice}` }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "AI", text: "⚠️ Sorry, AI service is currently unavailable." }
      ]);
      console.error(error);
    }

    setInput("");
  };

  const quickMoods = [
    { label: "😊 Happy", text: "I'm feeling happy!" },
    { label: "😔 Sad", text: "I'm feeling sad." },
    { label: "😡 Angry", text: "I'm feeling angry." },
    { label: "😰 Anxious", text: "I'm feeling anxious." },
    { label: "😴 Tired", text: "I'm feeling tired." }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
        🤖 AI Mental Health Assistant
      </h2>
      <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto">
        Chat with our AI assistant to track your mood, get guidance, and receive support. Interactions are fully anonymous.
      </p>

      {/* Quick Mood Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {quickMoods.map((m) => (
          <button
            key={m.label}
            onClick={() => handleSend(m.text)}
            className="px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-full shadow-sm text-sm transition"
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-md mb-4 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl max-w-xs break-words ${
              msg.sender === "User"
                ? "bg-indigo-100 self-end text-right"
                : "bg-green-100 self-start text-left"
            }`}
          >
            <span className="text-sm">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Mood Status */}
      {mood && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4 text-sm text-yellow-800">
          🌟 Mood Tracker: <strong>{mood.mood}</strong> — {mood.advice}
        </div>
      )}

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="px-4 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>

      {/* Footer guidance */}
      <div className="mt-6 text-center text-gray-500 text-sm max-w-xl mx-auto">
        💡 Tip: Use quick-mood buttons for faster tracking.  
        🔒 All chats are anonymous. Start a new conversation anytime.
      </div>
    </div>
  );
}
