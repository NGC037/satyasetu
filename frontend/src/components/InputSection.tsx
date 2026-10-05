"use client";

import React from "react";
import {
  Image as ImageIcon,
  MessageSquare,
  Mic,
  ArrowRight,
} from "lucide-react";

interface InputSectionProps {
  inputType: "screenshot" | "text" | "voice";
  setInputType: (type: "screenshot" | "text" | "voice") => void;
  onRunVerification: () => void;
  isLoading: boolean;
  sampleInputText: string;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputType,
  setInputType,
  onRunVerification,
  isLoading,
  sampleInputText,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Step 1: Input Forwarded Content
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setInputType("screenshot")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              inputType === "screenshot"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Screenshot</span>
          </button>
          <button
            onClick={() => setInputType("text")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              inputType === "text"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Text / URL</span>
          </button>
          <button
            onClick={() => setInputType("voice")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              inputType === "voice"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Mic className="h-3.5 w-3.5" />
            <span>Voice Note</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-700 mb-4 leading-relaxed">
        <span className="text-[10px] block font-sans uppercase font-bold text-slate-400 mb-1">
          Loaded WhatsApp Content:
        </span>
        {sampleInputText}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onRunVerification}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm transition"
        >
          <span>{isLoading ? "Investigating..." : "Investigate Claims"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
