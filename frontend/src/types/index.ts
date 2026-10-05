export type VerdictCategory =
  | "verified"
  | "false"
  | "partly_supported"
  | "outdated"
  | "cannot_confirm";

export interface EvidenceItem {
  title: string;
  url: string;
  publisher: string;
  date: string;
  excerpt: string;
  reliability_tier: string;
}

export interface ClaimDecomposition {
  id: string;
  text: string;
  verdict: VerdictCategory;
  confidence: number;
  reason: string;
  evidence: EvidenceItem[];
  tactical_tag?: string;
  timestamp_start?: string;
  timestamp_end?: string;
}

export interface VoiceMetadata {
  audio_duration: string;
  detected_language: string;
  transcription_confidence: number;
  transcript: string;
}

export interface VerificationReport {
  id: string;
  overall_verdict: VerdictCategory;
  input_type: "screenshot" | "text" | "voice";
  original_input: string;
  voice_metadata?: VoiceMetadata;
  claims: ClaimDecomposition[];
  limitations: string[];
  whatsapp_correction_text: string;
}

export interface PipelineProgress {
  step: number;
  label: string;
  completed_steps: number;
}
