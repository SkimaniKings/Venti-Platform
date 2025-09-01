// venti-web/src/pages/Monetization.tsx
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Monetization() {
  const [showDonation, setShowDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);

  const handleSuccess = (details: any, type: string) => {
    if (type === "subscription") {
      localStorage.setItem("venti_subscription", "Premium");
      alert(`Subscribed successfully! Thank you, ${details.payer.name.given_name}`);
    } else if (type === "donation") {
      const prev = Number(localStorage.getItem("venti_donation") || 0);
      const total = prev + donationAmount;
      localStorage.setItem("venti_donation", total.toString());
      alert(`Thank you for donating $${donationAmount}!`);
      setShowDonation(false);
    } else if (type === "consultation") {
      const prev = Number(localStorage.getItem("venti_paid_consultations") || 0);
      const total = prev + 1;
      localStorage.setItem("venti_paid_consultations", total.toString());
      alert(`Consultation payment successful! Total purchased: ${total}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        💳 Support & Premium
      </h1>

      <PayPalScriptProvider options={{ "client-id": "AQ_B9RIqQ03Qrau5mCbnTvPXJrwSA_YtuEStq6rvM-MXavz73kAkdsk4KWD8LM1nJCC-AkF4ZdsR2jvT" }}>

        {/* Premium Subscription */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">🌟 Go Premium</h2>
          <p className="text-gray-600 mb-4">
            Unlock an ad-free experience plus mood tracking, insights, and special features.
          </p>
          <PayPalButtons
            style={{ layout: "horizontal", color: "blue" }}
            createOrder={(data, actions) => actions.order.create({
              purchase_units: [{ amount: { value: "9.99" }, description: "Premium Subscription" }],
            })}
            onApprove={async (data, actions) => {
              const details = await actions.order!.capture();
              handleSuccess(details, "subscription");
            }}
          />
        </div>

        {/* Pay-per-Consultation */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">👩‍⚕️ Pay for Consultation</h2>
          <p className="text-gray-600 mb-4">
            Book a licensed professional for a one-time private session.
          </p>
          <PayPalButtons
            style={{ layout: "horizontal", color: "gold" }}
            createOrder={(data, actions) => actions.order.create({
              purchase_units: [{ amount: { value: "29.99" }, description: "Pay-per-Consultation" }],
            })}
            onApprove={async (data, actions) => {
              const details = await actions.order!.capture();
              handleSuccess(details, "consultation");
            }}
          />
        </div>

        {/* Donations */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">🙏 Donate</h2>
          <p className="text-gray-600 mb-4">
            Support subsidized sessions for users in need. Every contribution helps!
          </p>
          <button
            onClick={() => setShowDonation(!showDonation)}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow"
          >
            Donate 💖
          </button>

          {/* Inline Donation Panel */}
          {showDonation && (
            <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow">
              <h3 className="text-md font-semibold text-indigo-700 mb-2">Enter Donation Amount</h3>
              <input
                type="number"
                min={1}
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <PayPalButtons
                style={{ layout: "vertical", color: "blue" }}
                createOrder={(data, actions) => actions.order.create({
                  purchase_units: [{ amount: { value: donationAmount.toString() }, description: "Donation" }],
                })}
                onApprove={async (data, actions) => {
                  const details = await actions.order!.capture();
                  handleSuccess(details, "donation");
                }}
              />
              <button
                onClick={() => setShowDonation(false)}
                className="mt-3 w-full px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg shadow"
              >
                Cancel ❌
              </button>
            </div>
          )}
        </div>

      </PayPalScriptProvider>
    </div>
  );
}
