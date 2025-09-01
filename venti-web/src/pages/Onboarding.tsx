// venti-web/src/pages/Onboarding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "../utils/generateId";

export default function Onboarding() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleJoin = () => {
    const id = generateId();
    setUserId(id);
    // Reset session data for fresh start
    localStorage.setItem("venti_user_id", id);
    localStorage.setItem("venti_subscription", "Free");
    localStorage.setItem("venti_donation", "0");
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🌬️ Welcome to Venti
        </h1>
        <p className="text-gray-600 mb-6">
          Need to talk? You’re in a safe space.
          Join anonymously and let your thoughts flow.
        </p>

        {!userId ? (
          <button
            onClick={handleJoin}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300"
          >
            Join Anonymously
          </button>
        ) : (
          <div className="mt-4 text-green-600 font-semibold">
            ✅ Your ID: {userId}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          🔒 No email. No phone number. 100% anonymous.
        </p>
      </div>
    </div>
  );
}
