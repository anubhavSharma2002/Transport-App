import joblib
import pandas as pd
import os

def predict(hostel, day, hour):
    if not os.path.exists("models/crowd_model.pkl"):
        return -1

    model = joblib.load("models/crowd_model.pkl")
    le_hostel = joblib.load("models/hostel_encoder.pkl")
    le_day = joblib.load("models/day_encoder.pkl")

    h = le_hostel.transform([hostel])[0]
    d = le_day.transform([day])[0]

    X = pd.DataFrame([[h, d, hour]],
                     columns=["hostel_enc", "day_enc", "hour"])

    return int(model.predict(X)[0])
