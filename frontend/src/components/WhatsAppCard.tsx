"use client";

import React, { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface WhatsAppCardProps {
  cardText: string;
}

export const WhatsAppCard: React.FC<WhatsAppCardProps> = ({ cardText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b141a] text-slate-100 rounded-2xl p-6 shadow-md border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Share2 className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Shareable WhatsApp Correction Card
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy for WhatsApp"}</span>
        </button>
      </div>

      <div className="bg-[#111b21] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-emerald-100 whitespace-pre-wrap leading-relaxed">
        {cardText}
      </div>
      <p className="text-[10px] text-slate-400 mt-3 text-center">
        Ready to paste directly into WhatsApp group chats to neutralize
        misinformation.
      </p>
    </div>
  );
};
