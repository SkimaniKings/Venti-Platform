// venti-web/src/components/ReportModal.jsx
import React, { useState } from "react";

export default function ReportModal({ visible, onClose, onSubmit, reportedUserId }) {
  const [reason, setReason] = useState("");

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6">
        <h3 className="text-lg font-semibold">Report User</h3>
        <p className="text-sm text-slate-500 mt-2">You are reporting <span className="font-mono">{reportedUserId || "Anon"}</span>. This action will notify moderators (UI-only for MVP).</p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional — tell us why you're reporting (harassment, spam, self-harm, etc.)"
          className="mt-4 w-full rounded-lg border px-3 py-2 text-sm"
          rows={4}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-slate-600">Cancel</button>
          <button
            onClick={() => { onSubmit(reason); setReason(""); }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
