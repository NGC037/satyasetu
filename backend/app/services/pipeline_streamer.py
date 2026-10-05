import asyncio
import json
from app.mock_data import CASE_1_SCREENSHOT, CASE_2_VOICE

async def stream_investigation_pipeline(input_type: str = "screenshot"):
    """
    Simulates real-world multi-stage processing over SSE
    without blocking or exceeding demo video pacing.
    """
    target_data = CASE_2_VOICE if input_type == "voice" else CASE_1_SCREENSHOT
    
    stages = [
        {"step": 1, "label": "Ingesting Forward & Audio/Vision Preprocessing...", "status": "active"},
        {"step": 2, "label": "Executing Speech-to-Text & OCR extraction...", "status": "pending"},
        {"step": 3, "label": "Decomposing into verifiable sub-claims...", "status": "pending"},
        {"step": 4, "label": "Querying high-trust source hierarchy (PIB, WHO, MoHFW)...", "status": "pending"},
        {"step": 5, "label": "Checking publication dates & synthesizing Claim Map...", "status": "pending"}
    ]

    for idx, stage in enumerate(stages):
        yield {
            "event": "progress",
            "data": json.dumps({
                "step": stage["step"],
                "label": stage["label"],
                "completed_steps": idx
            })
        }
        await asyncio.sleep(0.6) # Short, polished visual cadence

    # Yield the fully structured result payload
    yield {
        "event": "complete",
        "data": target_data.model_dump_json()
    }