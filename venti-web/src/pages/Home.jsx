// venti-web/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // State
  const [userId, setUserId] = useState(null);
  const [subscription, setSubscription] = useState("Free");
  const [donation, setDonation] = useState(0);

  // Function to generate a fresh anonymous ID
  const generateAnonymousId = () => {
    return "anon_" + Math.random().toString(36).substring(2, 10);
  };

  // Handle leaving the session
  const handleLeaveSession = () => {
    // Clear all session-related data
    localStorage.removeItem("venti_user_id");
    localStorage.removeItem("venti_subscription");
    localStorage.removeItem("venti_donation");
    navigate("/"); // go back to onboarding
  };

  useEffect(() => {
    // Get or create user ID
    let id = localStorage.getItem("venti_user_id");
    if (!id) {
      id = generateAnonymousId();
      localStorage.setItem("venti_user_id", id);
      localStorage.setItem("venti_subscription", "Free");
      localStorage.setItem("venti_donation", "0");
    }

    setUserId(id);

    // Load current session data
    const subStatus = localStorage.getItem("venti_subscription") || "Free";
    const donated = Number(localStorage.getItem("venti_donation") || 0);
    setSubscription(subStatus);
    setDonation(donated);
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        🎉 Welcome to Venti Safe Space!
      </h2>

      {/* Anonymous ID */}
      {userId && (
        <p className="text-gray-700 mb-6">
          Your anonymous ID: <span className="font-mono">{userId}</span>
        </p>
      )}

      {/* Dashboard Notifications */}
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-md flex flex-col gap-3 mb-6">
        {/* Subscription Info */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-lg">
          <p className="text-indigo-700 font-medium">
            Subscription: <span className="font-semibold">{subscription}</span>
          </p>
          {subscription === "Free" && (
            <p className="text-indigo-600 text-sm">
              Upgrade to premium to unlock ad-free experience & mood insights.
            </p>
          )}
        </div>

        {/* Donation Info */}
        <div className="bg-pink-50 border-l-4 border-pink-500 p-3 rounded-lg">
          <p className="text-pink-700 font-medium">
            Total Donations: <span className="font-semibold">${donation}</span>
          </p>
          <p className="text-pink-600 text-sm">
            Your support helps provide safe spaces for others.
          </p>
        </div>
      </div>

      {/* Leave Session Button */}
      <button
        onClick={handleLeaveSession}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg text-lg"
      >
        🚪 Leave Session
      </button>
    </div>
  );
}
