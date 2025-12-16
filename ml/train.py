import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

def train_model(processed_csv):
    df = pd.read_csv(processed_csv)

    le_hostel = LabelEncoder()
    le_day = LabelEncoder()

    df["hostel_enc"] = le_hostel.fit_transform(df["hostel"])
    df["day_enc"] = le_day.fit_transform(df["day"])

    X = df[["hostel_enc", "day_enc", "hour"]]
    y = df["students"]

    model = RandomForestRegressor()
    model.fit(X, y)

    os.makedirs("models", exist_ok=True)

    joblib.dump(model, "models/crowd_model.pkl")
    joblib.dump(le_hostel, "models/hostel_encoder.pkl")
    joblib.dump(le_day, "models/day_encoder.pkl")
