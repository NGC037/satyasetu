"use client";

import React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { PipelineProgress } from "@/types";

interface ProcessingTimelineProps {
  progress: PipelineProgress | null;
}

export const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({
  progress,
}) => {
  const steps = [
    "Ingesting Forward & Audio/Vision Preprocessing",
    "Executing Speech-to-Text & OCR extraction",
    "Decomposing into verifiable sub-claims",
    "Querying high-trust source hierarchy (PIB, WHO, MoHFW)",
    "Checking publication dates & synthesizing Claim Map",
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Investigation Pipeline
        </span>
        <span className="text-xs text-slate-400">
          Streaming Verification Telemetry
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((label, idx) => {
          const currentStep = progress ? progress.step : 0;
          const isDone = currentStep > idx + 1;
          const isActive = currentStep === idx + 1;

          return (
            <div key={idx} className="flex items-center space-x-3 text-xs">
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 text-amber-400 animate-spin flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-700 flex-shrink-0" />
              )}
              <span
                className={
                  isActive
                    ? "text-amber-300 font-semibold"
                    : isDone
                      ? "text-slate-300"
                      : "text-slate-600"
                }
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
