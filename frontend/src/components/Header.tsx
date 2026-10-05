"use client";

import React from "react";
import { ShieldCheck, BarChart3, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenMetrics: () => void;
  activeDemo: string;
  onSelectDemo: (demoType: "screenshot" | "voice") => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMetrics,
  activeDemo,
  onSelectDemo,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                SatyaSetu
              </span>
              <span className="text-[10px] uppercase font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Evidence Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Don&apos;t blindly trust AI. Inspect the evidence.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Demo Switcher Buttons */}
          <div className="bg-slate-100 p-1 rounded-lg flex space-x-1 text-xs font-medium">
            <button
              onClick={() => onSelectDemo("screenshot")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeDemo === "screenshot"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Demo 1: Mixed Screenshot
            </button>
            <button
              onClick={() => onSelectDemo("voice")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeDemo === "voice"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Demo 2: Hindi Voice Note
            </button>
          </div>

          <button
            onClick={onOpenMetrics}
            className="flex items-center space-x-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Evaluation Matrix</span>
          </button>
        </div>
      </div>
    </header>
  );
};
