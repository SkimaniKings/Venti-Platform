// venti-web/src/utils/aiService.ts
export type AIReply = {
  id: string;
  text: string;
  at: number;
  crisis_flag?: boolean;
};

const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "hurt myself",
  "end my life",
  "i want to die",
  "want to die",
  "die by",
  "hang myself",
  "cut myself",
  "self-harm",
  "harm myself",
];

export function detectCrisis(text: string): boolean {
  const t = (text || "").toLowerCase();
  return CRISIS_KEYWORDS.some((k) => t.includes(k));
}

/**
 * mockAiReply:
 * - Returns a Promise that resolves to a friendly, reflective reply.
 * - Simulates latency and typing.
 * - If a crisis is detected, includes crisis_flag true in the reply.
 *
 * Later: replace this with a fetch() to your FastAPI /chatbot endpoint.
 */
export async function mockAiReply(userText: string): Promise<AIReply> {
  const crisis = detectCrisis(userText);

  // gentle response templates
  const templates = [
    "I hear you. That's really hard — thank you for sharing. Would you like a simple breathing exercise? 🌬️",
    "It sounds heavy. Take a moment — try inhaling for 4, hold 3, exhale for 6. I'm here with you.",
    "Thanks for telling me that. You're not alone — tell me more if you can, or we can try a grounding exercise together.",
    "I'm listening. If you want, describe what's happening right now — step by step.",
  ];

  // crisis override message
  const crisisMessage =
    "I'm detecting language that suggests you might be in danger. If you are thinking about harming yourself, please contact your local emergency services immediately or a crisis hotline. Would you like resources for your country?";

  // simulate variable latency
  const latency = 700 + Math.floor(Math.random() * 900);

  return new Promise((resolve) => {
    setTimeout(() => {
      const text = crisis ? crisisMessage : templates[Math.floor(Math.random() * templates.length)];
      resolve({
        id: `ai-${Date.now()}`,
        text,
        at: Date.now(),
        crisis_flag: crisis,
      });
    }, latency);
  });
}
