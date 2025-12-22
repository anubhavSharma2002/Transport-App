from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os

from preprocess import preprocess
from train import train_model
from predict import predict

app = FastAPI()

RAW_PATH = "data/raw/timetable.csv"
PROCESSED_PATH = "data/processed/processed.csv"

@app.post("/upload-timetable/")
async def upload(file: UploadFile = File(...)):
    os.makedirs("data/raw", exist_ok=True)
    os.makedirs("data/processed", exist_ok=True)

    df = pd.read_csv(
        file.file,
        encoding="latin1",
        sep=",",
        engine="python",
        on_bad_lines="skip"
    )

    df = df.dropna()

    df.to_csv(RAW_PATH, index=False)

    processed = preprocess(RAW_PATH)
    processed.to_csv(PROCESSED_PATH, index=False)

    train_model(PROCESSED_PATH)

    return {
        "status": "uploaded, processed and trained",
        "rows_after_cleaning": len(df)
    }



@app.get("/predict/")
def predict_api(hostel: str, day: str, hour: int):
    result = predict(hostel, day, hour)

    if result == -1:
        return {
            "error": "Model not trained yet. Upload timetable CSV first."
        }

    return {
        "hostel": hostel,
        "day": day,
        "hour": hour,
        "expected_students": result
    }


@app.get("/hourly-summary/")
def hourly_summary(day: str, hour: int):
    df = pd.read_csv(PROCESSED_PATH)
    result = df[(df["day"] == day) & (df["hour"] == hour)]
    return result.to_dict(orient="records")
