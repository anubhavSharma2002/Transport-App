import pandas as pd
import re

def time_to_hour(val):
    if pd.isna(val):
        return None

    val = str(val).strip().lower()

    if val.isdigit():
        return int(val)

    if ":" in val:
        return int(val.split(":")[0])

    match = re.match(r"(\d+)\s*(am|pm)", val)
    if match:
        hour = int(match.group(1))
        period = match.group(2)

        if period == "pm" and hour != 12:
            hour += 12
        if period == "am" and hour == 12:
            hour = 0

        return hour

    return None


def preprocess(csv_path):
    df = pd.read_csv(
        csv_path,
        encoding="utf-8",
        engine="python",
        on_bad_lines="skip"
    )

    df.columns = [c.strip().lower() for c in df.columns]

    col_map = {}

    for c in df.columns:
        if "hostel" in c:
            col_map["hostel"] = c
        elif "section" in c:
            col_map["section"] = c
        elif "day" in c:
            col_map["day"] = c
        elif "hour" in c or "time" in c:
            col_map["hour"] = c
        elif "student" in c or "strength" in c:
            col_map["students"] = c

    required = ["hostel", "day", "hour", "students"]
    for r in required:
        if r not in col_map:
            raise ValueError(f"Missing required column: {r}")

    df = df[
        [
            col_map["hostel"],
            col_map["day"],
            col_map["hour"],
            col_map["students"]
        ]
    ]

    df.columns = ["hostel", "day", "hour", "students"]

    df["hour"] = df["hour"].apply(time_to_hour)
    df = df.dropna()

    df["hour"] = df["hour"].astype(int)
    df["students"] = df["students"].astype(int)

    grouped = (
        df.groupby(["hostel", "day", "hour"])["students"]
        .sum()
        .reset_index()
    )

    return grouped
