# Add in venti-ai/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="Venti AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    user_id: str

class MoodRequest(BaseModel):
    text: str
    user_id: str

@app.post("/chat")
def chat_ai(request: ChatRequest):
    user_msg = request.message.lower()
    if "suicide" in user_msg or "hurt" in user_msg:
        return {"reply": "⚠️ If you feel unsafe, please contact emergency services immediately."}
    responses = [
        "I hear you, let's try a breathing exercise 🌬️",
        "Thanks for sharing, can you tell me more about how you're feeling?",
        "Remember to take a small pause and ground yourself.",
        "I'm here for you. Keep going, you're doing great!"
    ]
    return {"reply": random.choice(responses)}

@app.post("/mood")
def mood_analysis(request: MoodRequest):
    moods = ["happy", "sad", "anxious", "calm", "stressed"]
    detected_mood = random.choice(moods)
    advice_map = {
        "happy": "🌞 Keep up the positivity!",
        "sad": "😔 Take a moment to rest and reflect.",
        "anxious": "🧘 Try deep breathing or a grounding exercise.",
        "calm": "💧 Great! Maintain this calm with mindfulness.",
        "stressed": "⚡ Take a short break or write down your thoughts."
    }
    return {
        "mood": detected_mood,
        "advice": advice_map.get(detected_mood, "")
    }
