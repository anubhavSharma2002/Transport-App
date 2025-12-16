import pandas as pd

def preprocess(csv_path):
    df = pd.read_csv(csv_path)
    df = df.dropna()

    df["hour"] = df["hour"].astype(int)
    df["students"] = df["students"].astype(int)

    grouped = (
        df.groupby(["hostel", "day", "hour"])["students"]
        .sum()
        .reset_index()
    )

    return grouped
