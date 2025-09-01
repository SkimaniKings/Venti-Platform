// venti-web/src/pages/About.tsx
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        🌬️ Welcome to Venti Safe Space
      </h1>

      {/* Introduction */}
      <section className="max-w-4xl text-center mb-10">
        <p className="text-lg text-gray-700 mb-4">
          At <span className="font-semibold">Venti</span>, we believe that everyone deserves a safe, anonymous space to express themselves freely. Life can be overwhelming, and sometimes the simplest act—sharing your thoughts—can help lighten the load.
        </p>
        <p className="text-lg text-gray-700">
          Whether you’re looking to vent, reflect, or seek guidance, Venti provides a platform tailored to your emotional well-being.
        </p>
      </section>

      {/* What We Offer */}
      <section className="max-w-4xl mb-10">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">💡 What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Private Venting</h3>
            <p className="text-gray-600">
              Share your thoughts safely through text, voice-to-text, or personal diary entries. Everything is private, and your feelings are always respected.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Community Support</h3>
            <p className="text-gray-600">
              Connect with peers, trained listeners, and licensed professionals through our support directory. Find someone to talk to anytime you need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">AI Assistance & Mood Analysis</h3>
            <p className="text-gray-600">
              Get helpful insights with our AI assistant. Analyze your mood patterns and gain guidance to manage stress and emotions effectively.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Donations & Premium Options</h3>
            <p className="text-gray-600">
              Support Venti’s mission or unlock premium features for an ad-free, enriched experience. Your contributions help sustain safe spaces for others.
            </p>
          </div>
        </div>
      </section>

      {/* Why Open Up */}
      <section className="max-w-4xl mb-10 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">🌟 Why You Should Open Up</h2>
        <p className="text-gray-700 text-lg mb-2">
          Bottling emotions inside can be exhausting. Sharing them—even anonymously—can reduce stress, provide clarity, and give you a sense of relief.
        </p>
        <p className="text-gray-700 text-lg">
          Venti is designed to make you feel heard, safe, and supported without any judgment. Your voice matters here.
        </p>
      </section>

      {/* Encouragement */}
      <section className="max-w-4xl mb-10 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">💛 Encouragement</h2>
        <p className="text-gray-700 text-lg mb-2">
          It’s okay to feel what you feel. It’s okay to take a moment for yourself. At Venti, you can be completely authentic. No one is watching. No one is judging.
        </p>
        <p className="text-gray-700 text-lg">
          Start your journey today, and give yourself the gift of emotional release.
        </p>
      </section>

      {/* Call-to-Action */}

    </div>
  );
}
