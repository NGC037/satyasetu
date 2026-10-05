"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { ProcessingTimeline } from "@/components/ProcessingTimeline";
import { ClaimMap } from "@/components/ClaimMap";
import { VoicePlayer } from "@/components/VoicePlayer";
import { WhatsAppCard } from "@/components/WhatsAppCard";
import { MetricsModal } from "@/components/MetricsModal";
import { VerificationReport, PipelineProgress } from "@/types";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<"screenshot" | "voice">(
    "screenshot",
  );
  const [inputType, setInputType] = useState<"screenshot" | "text" | "voice">(
    "screenshot",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<PipelineProgress | null>(null);
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [highlightedAudioRange, setHighlightedAudioRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  // Sync active demo state with input type selection
  const handleSelectDemo = (type: "screenshot" | "voice") => {
    setActiveDemo(type);
    setInputType(type);
    setReport(null);
    setProgress(null);
  };

  const sampleText =
    activeDemo === "voice"
      ? "सरकार ने सभी लोगों के लिए मुफ्त इलाज की घोषणा की है, तुरंत इस लिंक पर पंजीकरण करें।"
      : "URGENT! Drinking hot water can cure dengue. The government has announced free treatment for everyone. This information is from the latest update, so share this with 10 people immediately!";

  const handleRunVerification = async () => {
    setIsLoading(true);
    setReport(null);
    setProgress({ step: 1, label: 'Initializing pipeline...', completed_steps: 0 });

    try {
      const eventSource = new EventSource(`http://localhost:8000/api/verify/stream?input_type=${activeDemo}`);

      eventSource.addEventListener('progress', (e) => {
        const data: PipelineProgress = JSON.parse(e.data);
        setProgress(data);
      });

      eventSource.addEventListener('complete', (e) => {
        const data: VerificationReport = JSON.parse(e.data);
        // Mark all 5 steps complete visually
        setProgress({ step: 6, label: 'Investigation Complete', completed_steps: 5 });
        setReport(data);
        setIsLoading(false);
        eventSource.close();
      });

      eventSource.onerror = async () => {
        eventSource.close();
        // Instant reliable fallback for zero latency
        const res = await fetch(`http://localhost:8000/api/demo/case/${activeDemo}`);
        const fallbackData = await res.json();
        setProgress({ step: 6, label: 'Investigation Complete', completed_steps: 5 });
        setReport(fallbackData);
        setIsLoading(false);
      };
    } catch {
      const res = await fetch(`http://localhost:8000/api/demo/case/${activeDemo}`);
      const fallbackData = await res.json();
      setProgress({ step: 6, label: 'Investigation Complete', completed_steps: 5 });
      setReport(fallbackData);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      <Header
        onOpenMetrics={() => setIsMetricsOpen(true)}
        activeDemo={activeDemo}
        onSelectDemo={handleSelectDemo}
      />

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        {/* Step 1: Input Box */}
        <InputSection
          inputType={inputType}
          setInputType={(t) => {
            setInputType(t);
            setActiveDemo(t === "voice" ? "voice" : "screenshot");
          }}
          onRunVerification={handleRunVerification}
          isLoading={isLoading}
          sampleInputText={sampleText}
        />

        {/* Step 2: Animated Investigation Pipeline (Visible during & after loading) */}
        {(isLoading || progress) && <ProcessingTimeline progress={progress} />}

        {/* Step 3: Voice Note Player (Conditioned on voice note demo) */}
        {report && report.voice_metadata && (
          <VoicePlayer
            metadata={report.voice_metadata}
            highlightedRange={highlightedAudioRange}
          />
        )}

        {/* Step 4: The Signature Claim Map */}
        {report && (
          <ClaimMap
            claims={report.claims}
            onSelectClaimTimestamp={(range) => setHighlightedAudioRange(range)}
          />
        )}

        {/* Step 5: Shareable WhatsApp Correction Card */}
        {report && <WhatsAppCard cardText={report.whatsapp_correction_text} />}
      </main>

      <MetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
      />
    </div>
  );
}
