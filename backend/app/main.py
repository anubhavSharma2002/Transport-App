from fastapi import FastAPI, WebSocket
app = FastAPI()

@app.get("/health")
async def health():
    return {"status":"ok"}

@app.websocket("/ws/vehicle")
async def vehicle_ws(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_json()  # expect {vehicle_id, lat, lon, speed, ts}
            # TODO: publish to Redis / save to DB
            await ws.send_json({"received": True})
    except Exception:
        await ws.close()
