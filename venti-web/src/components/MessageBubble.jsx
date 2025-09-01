// venti-web/src/components/MessageBubble.jsx
import React from "react";

export default function MessageBubble({ msg, isMe }) {
  return (
    <div className={`max-w-[75%] ${isMe ? "ml-auto text-right" : "mr-auto text-left"}`}>
      <div className={`${isMe ? "bg-indigo-50 border-indigo-200" : "bg-gray-100 border-gray-100"} p-3 rounded-2xl border text-sm`}>
        <div className="text-slate-700 whitespace-pre-wrap">{msg.text}</div>
        <div className="text-[11px] text-slate-400 mt-2">{new Date(msg.at).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
