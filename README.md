# Venti Platform 🌿
**Venti** is a full-stack mental health support platform that provides a safe, private, and interactive space for users to vent, connect, and seek professional help. It includes real-time chatrooms, a community wall, AI-assisted mood guidance, personal venting modes (text, voice, diary), and a directory of professional supporters.  

This platform is designed as a **prototype** with local persistence for venting and diary features, and ready to integrate a backend for full functionality.

---

## 📑 Table of Contents
1. [Project Structure](#project-structure)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Getting Started](#getting-started)  
5. [Frontend Setup](#frontend-setup)  
6. [Backend Setup](#backend-setup)  
7. [AI Service Setup](#ai-service-setup)  
8. [Deployment](#deployment)  
9. [Environment Variables](#environment-variables)  
10. [Usage](#usage)  
11. [Future Improvements](#future-improvements)  
12. [License](#license)

---

## 📂 Project Structure
venti/
├─ venti-web/ # React frontend
├─ venti-api/ # Node.js + Express + Socket.io backend
└─ venti-ai/ # Python FastAPI AI assistant service

markdown
Copy code
- **venti-web**: React + Vite frontend, implements UI for chatrooms, community wall, venting modes, AI assistant, monetization, and support directory.  
- **venti-api**: Express backend with Socket.io for real-time communication (chatrooms, community wall posts, supporters data).  
- **venti-ai**: Python FastAPI service for AI assistant and mood analysis.  

---

## ✨ Features
### 1. **User Interaction**
- Join themed chatrooms (stress support, grief, addiction recovery, student life).  
- Real-time chat using **Socket.io**.  

### 2. **Community Wall**
- Post anonymous thoughts, messages, and share experiences.  
- Real-time updates for new posts.  

### 3. **Venting Modes**
- **Text Venting**: Type and release thoughts safely (messages vanish after sending).  
- **Voice-to-Text**: Record voice, get transcription, optionally save as diary entry.  
- **Diary**: Private diary mode with local storage (save, delete, clear).  

### 4. **AI Mental Health Assistant**
- Provides mood analysis and tailored advice.  
- Tracks user interactions and responds conversationally.  

### 5. **Support Directory**
- Browse volunteers, free, and paid professional supporters.  
- Filter by supporter type.  
- Chat or upgrade to a paid session with professionals.  

### 6. **Monetization**
- Donations for subsidized sessions.  
- Premium upgrade for ad-free and advanced insights.  
- Pay-per-consultation with professionals.  
- **PayPal** client-side integration.  

### 7. **Local Persistence**
- Venting and diary entries stored locally with **localStorage**.  
- Works without backend for demo/prototype.  

---

## 🛠️ Technologies Used
- **Frontend:** React, TypeScript, Vite, TailwindCSS  
- **Backend:** Node.js, Express, Socket.io, CORS  
- **AI Service:** Python, FastAPI, OpenAI API (or alternative AI models)  
- **Deployment:** Vercel (frontend), Render (backend & AI service)  
- **Other:** PayPal SDK, browser localStorage  

---

## 🚀 Getting Started
Clone the repository:
bash
git clone https://github.com/SkimaniKings/Venti-Platform.git
cd Venti-Platform
The project has three parts that can run independently:

Frontend (venti-web)

Backend (venti-api)

AI Service (venti-ai)

## 🎨 Frontend Setup
bash
Copy code
cd venti-web
npm install
npm run dev   # start development server
Access frontend at: http://localhost:5173
For production build:

bash
Copy code
npm run build
## ⚙️ Backend Setup
bash
Copy code
cd venti-api
npm install
node index.js
Backend runs on the specified PORT (default: 3000).

## 🤖 AI Service Setup
bash
Copy code
cd venti-ai
pip install -r requirements.txt
Run with Uvicorn:

bash
Copy code
uvicorn main:app --reload
## 🌍 Deployment

Frontend (Vercel)
Connect GitHub repository

Root Directory → venti-web

Build Command → npm run build

Output Directory → dist

Env Vars → none needed for local prototype

Backend (Render)
Create Web Service → Root: venti-api

Environment: Node 18+

Start Command: node index.js

Set PORT variable if needed

AI Service (Render or Python Host)
Runtime: Python 3.11+

Start Command:

bash
Copy code
uvicorn main:app --host 0.0.0.0 --port $PORT
Set backend/frontend environment variable for AI endpoint

## 🔑 Environment Variables
PORT → optional for backend/AI service

OPENAI_API_KEY → required if using OpenAI GPT API

## 📌 Usage
Chatrooms → Join and chat with peers.

Community Wall → Post & view anonymous thoughts.

Venting Modes → Text, voice, or diary entries.

AI Assistant → Get mood insights and advice.

Support Directory → Browse supporters or book professionals.

Monetization → Donate or subscribe for premium.

## 🔮 Future Improvements
Full voice-to-text with browser microphone.

Smarter AI with deeper NLU (Natural Language Understanding).

Persistent backend storage with MongoDB/PostgreSQL.

Authentication & user profiles.

Notifications for chat/posts.

Premium analytics dashboards.

## 📜 License
MIT License © 2025 Simon Kimani