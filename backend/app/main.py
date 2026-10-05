from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from app.services.pipeline_streamer import stream_investigation_pipeline
from app.mock_data import CASE_1_SCREENSHOT, CASE_2_VOICE, EVALUATION_METRICS
from typing import Optional

app = FastAPI(title="SatyaSetu API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "online", "system": "SatyaSetu Claim Verification Engine"}

@app.get("/api/verify/stream")
async def verify_stream(input_type: str = "screenshot"):
    """
    Streams the verification timeline and claim synthesis in real-time.
    """
    return EventSourceResponse(stream_investigation_pipeline(input_type))

@app.get("/api/demo/case/{case_id}")
def get_demo_case(case_id: str):
    """
    Instant fallback endpoint for recording zero-latency demo runs.
    """
    if case_id == "voice":
        return CASE_2_VOICE
    return CASE_1_SCREENSHOT

@app.get("/api/metrics")
def get_metrics():
    """
    Provides the quantitative 15-case test matrix for the pitch presentation.
    """
    return EVALUATION_METRICS