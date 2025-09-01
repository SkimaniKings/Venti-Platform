// venti-web/src/pages/VentingModes.tsx
import React, { useState, useEffect, useRef } from "react";

type Note = {
  id: number;
  content: string;
  date: string;
  type: "Diary" | "Voice";
};

export default function VentingModes() {
  const [activeTab, setActiveTab] = useState("text");
  const [ventInput, setVentInput] = useState("");
  const [voiceInput, setVoiceInput] = useState("");
  const [diaryInput, setDiaryInput] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef<any>(null);

  const encrypt = (text: string) => btoa(text);
  const decrypt = (text: string) => {
    try {
      return atob(text);
    } catch {
      return text;
    }
  };

  // Load saved notes
  useEffect(() => {
    const saved = localStorage.getItem("savedNotes");
    if (saved) {
      setNotes(JSON.parse(saved).map((n: any) => ({ ...n, content: decrypt(n.content) })));
    }
  }, []);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join("");
        setVoiceInput(transcript);
      };
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    } else {
      console.warn("Web Speech API not supported.");
    }
  }, []);

  // Recording handlers
  const startRecording = () => {
    if (!recognitionRef.current) return;
    setIsRecording(true);
    recognitionRef.current.start();
  };
  const stopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  // Save handlers
  const saveVoiceNote = () => saveNote("Voice", voiceInput, setVoiceInput);
  const saveDiaryEntry = () => saveNote("Diary", diaryInput, setDiaryInput);

  const saveNote = (type: "Voice" | "Diary", content: string, clearFn: any) => {
    if (!content.trim()) return;
    const newNote: Note = { id: Date.now(), content, date: new Date().toLocaleString(), type };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem("savedNotes", JSON.stringify(updated.map(n => ({ ...n, content: encrypt(n.content) }))));
    clearFn("");
  };

  const deleteNote = (id: number) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem("savedNotes", JSON.stringify(updated.map(n => ({ ...n, content: encrypt(n.content) }))));
  };

  const clearAllNotes = () => {
    if (!confirm("Are you sure you want to delete all saved notes?")) return;
    setNotes([]);
    localStorage.removeItem("savedNotes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">🌿 Venting Modes</h1>
      <p className="text-center text-gray-600 mb-6">
        Express yourself safely. Use text, voice, or diary — all notes are saved in one place.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["text", "voice", "diary", "notes"].map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveTab(mode)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              activeTab === mode
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {mode === "text" && "✍️ Text Venting"}
            {mode === "voice" && "🎤 Voice-to-Text"}
            {mode === "diary" && "📖 Diary"}
            {mode === "notes" && "📌 Saved Notes"}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="flex-1 bg-white shadow-xl rounded-3xl p-6 border border-gray-200 overflow-y-auto">
        {/* Text Venting */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <textarea
              value={ventInput}
              onChange={(e) => setVentInput(e.target.value)}
              placeholder="Type out your feelings... they will disappear once you release them."
              className="w-full h-44 border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-400 outline-none resize-none placeholder-gray-400"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setVentInput("")}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-2xl shadow font-semibold transition transform hover:-translate-y-0.5"
              >
                Release ✨
              </button>
              <p className="text-gray-500 text-sm italic">Once you release, your words vanish safely.</p>
            </div>
          </div>
        )}

        {/* Voice-to-Text */}
        {activeTab === "voice" && (
          <div className="space-y-4">
            <p className="text-gray-600 mb-2">🎤 Record your voice and save it as a note.</p>
            <div className="flex justify-center gap-4 mb-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-2xl shadow font-semibold hover:bg-indigo-700 transition"
                >
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 text-white px-6 py-2 rounded-2xl shadow font-semibold hover:bg-red-600 transition"
                >
                  Stop Recording
                </button>
              )}
            </div>
            <textarea
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              placeholder="Your transcription appears here..."
              className="w-full h-36 border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-400 outline-none resize-none placeholder-gray-400"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={saveVoiceNote}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-2xl shadow font-semibold transition transform hover:-translate-y-0.5"
              >
                Save 💾
              </button>
              <button
                onClick={clearAllNotes}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-2xl shadow font-semibold transition"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Diary */}
        {activeTab === "diary" && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <textarea
                value={diaryInput}
                onChange={(e) => setDiaryInput(e.target.value)}
                placeholder="Write your private thoughts here..."
                className="flex-1 h-36 border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-400 outline-none resize-none placeholder-gray-400"
              />
              <button
                onClick={saveDiaryEntry}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-2xl shadow font-semibold transition transform hover:-translate-y-0.5"
              >
                Save 💾
              </button>
            </div>
          </div>
        )}

        {/* Saved Notes */}
        {activeTab === "notes" && (
          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="text-gray-400 text-center mt-4">No saved notes yet. Start venting your thoughts!</p>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-indigo-700">📌 Your Notes</h2>
                  <button
                    onClick={clearAllNotes}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Clear All
                  </button>
                </div>
                <ul className="space-y-3">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-gray-200 rounded-2xl shadow-lg relative hover:shadow-2xl transition transform hover:-translate-y-0.5"
                    >
                      <span className="text-xs font-semibold text-indigo-700">{note.type === "Diary" ? "📖 Diary" : "🎤 Voice"}</span>
                      <p className="text-gray-800 mt-1 whitespace-pre-wrap">{note.content}</p>
                      <span className="text-sm text-gray-500 block mt-2">{note.date}</span>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        title="Delete Note"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
