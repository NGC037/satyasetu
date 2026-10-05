from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class VerdictCategory(str, Enum):
    VERIFIED = "verified"
    FALSE = "false"
    PARTLY_SUPPORTED = "partly_supported"
    OUTDATED = "outdated"
    CANNOT_CONFIRM = "cannot_confirm"

class EvidenceItem(BaseModel):
    title: str
    url: str
    publisher: str
    date: str
    excerpt: str
    reliability_tier: str = "Official / High Trust"

class ClaimDecomposition(BaseModel):
    id: str
    text: str
    verdict: VerdictCategory
    confidence: float
    reason: str
    evidence: List[EvidenceItem] = []
    tactical_tag: Optional[str] = None  # e.g., "Engagement Bait", "Social Engineering"
    timestamp_start: Optional[str] = None # e.g. "00:06"
    timestamp_end: Optional[str] = None   # e.g. "00:13"

class VoiceMetadata(BaseModel):
    audio_duration: str
    detected_language: str
    transcription_confidence: float
    transcript: str

class VerificationReport(BaseModel):
    id: str
    overall_verdict: VerdictCategory
    input_type: str  # "screenshot", "text", "voice"
    original_input: str
    voice_metadata: Optional[VoiceMetadata] = None
    claims: List[ClaimDecomposition]
    limitations: List[str]
    whatsapp_correction_text: str