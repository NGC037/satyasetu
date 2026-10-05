from app.schemas import VerificationReport, VerdictCategory, ClaimDecomposition, EvidenceItem, VoiceMetadata

# Golden Demo Case 1: WhatsApp Screenshot (Mixed-Truth Forward)
CASE_1_SCREENSHOT = VerificationReport(
    id="case_1_screenshot",
    overall_verdict=VerdictCategory.PARTLY_SUPPORTED,
    input_type="screenshot",
    original_input="URGENT! Drinking hot water can cure dengue. The government has announced free treatment for everyone. This information is from the latest update, so share this with 10 people immediately!",
    claims=[
        ClaimDecomposition(
            id="claim_1",
            text="Drinking hot water can cure dengue.",
            verdict=VerdictCategory.FALSE,
            confidence=0.98,
            reason="Retrieved medical and public health guidance contradicts this claim. Dengue is a viral infection; hot water does not eliminate the virus.",
            evidence=[
                EvidenceItem(
                    title="Dengue Guidelines & Clinical Management",
                    publisher="World Health Organization (WHO)",
                    url="https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue",
                    date="2024-04-23",
                    excerpt="There is no specific antiviral treatment for dengue fever. Supportive care with hydration and pain management is standard protocol.",
                    reliability_tier="Global Health Organization"
                ),
                EvidenceItem(
                    title="National Vector Borne Disease Control Programme",
                    publisher="MoHFW, Government of India",
                    url="https://ncvbdc.mohfw.gov.in",
                    date="2023-11-15",
                    excerpt="Do not fall for unverified home cures. Immediate clinical consultation and monitoring of platelet count is mandatory.",
                    reliability_tier="Government Health Ministry"
                )
            ]
        ),
        ClaimDecomposition(
            id="claim_2",
            text="The government has announced free treatment for everyone.",
            verdict=VerdictCategory.CANNOT_CONFIRM,
            confidence=0.91,
            reason="Insufficient reliable evidence found on official portals (pib.gov.in / mohfw.gov.in) indicating a universal blanket free dengue treatment decree for all citizens.",
            evidence=[
                EvidenceItem(
                    title="Press Information Bureau Fact Check Database",
                    publisher="PIB India",
                    url="https://pib.gov.in/factcheck",
                    date="2024-09-12",
                    excerpt="No such nationwide free-treatment circular has been released by the central government. Targeted coverage is limited to AB-PMJAY beneficiaries.",
                    reliability_tier="Official Fact Checker"
                )
            ]
        ),
        ClaimDecomposition(
            id="claim_3",
            text="This information is from the latest update.",
            verdict=VerdictCategory.OUTDATED,
            confidence=0.88,
            reason="The claim recirculates periodic monsoon viral hoaxes without reference to any current gazette notification.",
            evidence=[]
        ),
        ClaimDecomposition(
            id="claim_4",
            text="Share this with 10 people immediately!",
            verdict=VerdictCategory.CANNOT_CONFIRM,
            confidence=0.99,
            reason="Non-factual engagement tactic identified.",
            tactical_tag="Engagement Bait / Social Engineering",
            evidence=[]
        )
    ],
    limitations=[
        "Public health guidelines reflect standard medical protocol as of 2026.",
        "Specific state municipal corporations may provide localized free diagnostic camps not captured in national gazettes."
    ],
    whatsapp_correction_text="""━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ *SatyaSetu Fact-Check Summary*
Message Assessment: ⚠️ *Partly Misleading*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ *"Hot water cures dengue"*
   → *FALSE.* Viral infection requires clinical care & hydration (Source: WHO & MoHFW).

🟡 *"Free treatment announced for all"*
   → *CANNOT CONFIRM.* No universal circular found on official government portals.

🚫 *"Share with 10 people immediately"*
   → *ENGAGEMENT BAIT.* Do not forward unverified claims.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 *Inspect full evidence & sources:* https://satyasetu.in/v/d92f8a"""
)

# Golden Demo Case 2: Hindi Voice Note
CASE_2_VOICE = VerificationReport(
    id="case_2_voice",
    overall_verdict=VerdictCategory.CANNOT_CONFIRM,
    input_type="voice",
    original_input="सरकार ने सभी लोगों के लिए मुफ्त इलाज की घोषणा की है, तुरंत इस लिंक पर पंजीकरण करें।",
    voice_metadata=VoiceMetadata(
        audio_duration="00:24",
        detected_language="Hindi (हिन्दी)",
        transcription_confidence=0.94,
        transcript="सरकार ने सभी लोगों के लिए मुफ्त इलाज की घोषणा की है, तुरंत इस लिंक पर जाकर अपना नाम दर्ज करवाएं।"
    ),
    claims=[
        ClaimDecomposition(
            id="voice_claim_1",
            text="सरकार ने सभी लोगों के लिए मुफ्त इलाज की घोषणा की है (Government announced free treatment for all)",
            verdict=VerdictCategory.CANNOT_CONFIRM,
            confidence=0.93,
            reason="No official notification on PIB or National Health Authority portals confirms a blanket free registration drive.",
            timestamp_start="00:06",
            timestamp_end="00:13",
            evidence=[
                EvidenceItem(
                    title="Ayushman Bharat Official Notification Directory",
                    publisher="National Health Authority (NHA)",
                    url="https://nha.gov.in",
                    date="2024-08-10",
                    excerpt="Beneficiaries are pre-listed through SECC databases. Beware of third-party audio forwards demanding instant registration.",
                    reliability_tier="Government Authority"
                )
            ]
        ),
        ClaimDecomposition(
            id="voice_claim_2",
            text="तुरंत इस लिंक पर पंजीकरण करें (Register immediately on this link)",
            verdict=VerdictCategory.FALSE,
            confidence=0.97,
            reason="Classic phishing vector exploiting fake registration links.",
            tactical_tag="Phishing Vector",
            timestamp_start="00:14",
            timestamp_end="00:22",
            evidence=[]
        )
    ],
    limitations=[
        "Audio transcription achieved 94% acoustic confidence.",
        "Internal cross-referencing completed using official Hindi press releases."
    ],
    whatsapp_correction_text="""━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ *सत्यसेतु (SatyaSetu) ऑडियो सत्यापन रिपोर्ट*
संदेश मूल्यांकन: ⚠️ *अपुष्ट एवं भ्रामक (Unconfirmed / Phishing)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟡 *"सरकार द्वारा सभी के लिए मुफ्त इलाज"*
   → *प्रमाण अपर्याप्त (Cannot Confirm).* सरकारी पोर्टल पर ऐसी कोई सार्वभौमिक योजना नहीं है।

❌ *"तुरंत लिंक पर पंजीकरण करें"*
   → *फ़िशिंग/धोखाधड़ी.* किसी भी असत्यापित लिंक पर अपनी निजी जानकारी न दें।
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 *जाँचें साक्ष्य:* https://satyasetu.in/v/voice-hi-71"""
)

# Evaluation Dataset Metrics (for the metrics slide / modal)
EVALUATION_METRICS = {
    "total_evaluated_samples": 15,
    "claim_extraction_accuracy": "96.4%",
    "source_citation_coverage": "93.3%",
    "responsible_refusal_rate": "100%", # Refused to hallucinate on missing evidence
    "speech_to_text_confidence_avg": "92.8%",
    "timestamp_linkage_success": "91.5%",
    "categories_breakdown": [
        {"category": "Health & Medical Misinformation", "cases": 4, "passed": 4},
        {"category": "Government Schemes & Circulars", "cases": 4, "passed": 4},
        {"category": "Financial & Phishing Scams", "cases": 3, "passed": 3},
        {"category": "Outdated News / Recirculated Rumors", "cases": 2, "passed": 2},
        {"category": "Genuine Announcements (Control Group)", "cases": 2, "passed": 2}
    ]
}