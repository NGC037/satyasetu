"use client";

import React, { useState } from "react";
import { Play, Pause, Mic, Radio, Clock } from "lucide-react";
import { VoiceMetadata } from "@/types";

interface VoicePlayerProps {
  metadata: VoiceMetadata;
  highlightedRange?: { start: string; end: string } | null;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  metadata,
  highlightedRange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Audio Forward Verification
            </h3>
            <p className="text-xs text-slate-500">
              Language: {metadata.detected_language}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-medium">
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Duration: {metadata.audio_duration}</span>
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full flex items-center space-x-1">
            <Radio className="h-3 w-3" />
            <span>
              Confidence: {(metadata.transcription_confidence * 100).toFixed(0)}
              %
            </span>
          </span>
        </div>
      </div>

      {/* Simulated Audio Waveform */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center space-x-4 mb-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>

        {/* Audio Wave Bars */}
        <div className="flex-1 flex items-center space-x-1 h-8">
          {[
            40, 65, 30, 85, 95, 45, 70, 80, 25, 60, 90, 75, 50, 65, 35, 80, 55,
            70, 45, 30,
          ].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-slate-500">00:06 / 00:24</span>
      </div>

      {/* Transcript with timestamp highlighting */}
      <div className="text-xs">
        <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Exact Audio Transcript:
        </span>
        <p className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 leading-relaxed font-sans">
          &ldquo;
          <span
            className={
              highlightedRange
                ? "bg-amber-200 font-semibold px-1 rounded transition"
                : ""
            }
          >
            {metadata.transcript}
          </span>
          &rdquo;
        </p>
      </div>
    </div>
  );
};
