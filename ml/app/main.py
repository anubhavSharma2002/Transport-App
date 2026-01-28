from fastapi import FastAPI, UploadFile, File, Form
from .phase1_first_round import phase1_first_round

app = FastAPI(title="Transport Allocation Engine - Phase 1")

@app.get("/")
def health():
    return {"status": "running - phase 1"}

@app.post("/run-allocation")
async def allocate(
    buses: int = Form(...),
    shuttles: int = Form(...),
    file: UploadFile = File(...)
):
    file_content = (await file.read()).decode("utf-8")

    result = phase1_first_round(
        file_content=file_content,
        buses=buses,
        shuttles=shuttles,
    )

    return {
        "message": "Phase 1 allocation completed",
        "phase": "First Round Only",
        "result": result
    }
