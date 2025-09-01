// venti-web/src/pages/SupportDirectory.tsx
import React, { useEffect, useState } from "react";

type Supporter = {
  id: number;
  name: string;
  type: "Volunteer" | "Free" | "Paid";
  bio: string;
};

export default function SupportDirectory() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [filter, setFilter] = useState<"All" | "Volunteer" | "Free" | "Paid">("All");

  // Fetch supporters from backend
  useEffect(() => {
    fetch("http://localhost:4000/supporters")
      .then((res) => res.json())
      .then((data) => setSupporters(data))
      .catch((err) => console.error("Error fetching supporters:", err));
  }, []);

  const filtered =
    filter === "All" ? supporters : supporters.filter((s) => s.type === filter);

  const handleContact = (name: string) => {
    alert(`Opening chat with ${name} (mock)`); // placeholder for actual chat
  };

  const handleUpgrade = (name: string) => {
    alert(`Upgrade for professional session with ${name} (placeholder for payment)`); // placeholder for payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
        🤝 Connect with Supporters
      </h1>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Our Support Directory helps you find the right person to talk to. Choose from volunteers, free supporters, or professional paid mentors to guide you safely. Each supporter is here to listen and provide meaningful support.
      </p>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {["All", "Volunteer", "Free", "Paid"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === f
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between hover:scale-105 transform transition-all duration-300"
          >
            {/* Supporter Info */}
            <div>
              <h2 className="text-xl font-semibold text-indigo-700">{s.name}</h2>
              <span className={`inline-block px-2 py-1 mt-1 mb-2 text-xs font-medium rounded-full 
                ${s.type === "Volunteer" ? "bg-green-100 text-green-700" : 
                  s.type === "Free" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                {s.type}
              </span>
              <p className="text-gray-600 text-sm">{s.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => handleContact(s.name)}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-sm transition"
              >
                Chat 💬
              </button>
              {s.type === "Paid" && (
                <button
                  onClick={() => handleUpgrade(s.name)}
                  className="flex-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow text-sm transition"
                >
                  Upgrade 💳
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 col-span-full mt-6">
            No supporters found for the selected filter. Try a different category.
          </p>
        )}
      </div>

      {/* Extra Information */}
      <div className="mt-10 max-w-2xl mx-auto text-center text-gray-600 space-y-3">
        <h3 className="text-lg font-semibold text-indigo-700">Why Connect?</h3>
        <p>
          Talking to someone, even anonymously, can help reduce stress, clarify thoughts, and give emotional relief. Our supporters are here to provide a safe, judgment-free environment.
        </p>
        <p>
          Whether you need quick advice, a listening ear, or professional guidance, choose a supporter that fits your needs. Remember: you are never alone.
        </p>
      </div>
    </div>
  );
}
