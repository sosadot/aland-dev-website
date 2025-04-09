from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import aiohttp
import asyncio
import random
import string
import json

app = FastAPI()

characters = string.ascii_lowercase + string.digits + "_"
USERNAME_LENGTH = 3
REQUEST_DELAY = 1.0

@app.get("/")
async def get():
    return HTMLResponse(open("index.html").read())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("🌐 WebSocket connected!")

    stats = {"total": 0, "available": 0, "taken": 0, "errors": 0}
    tried = set()

    async with aiohttp.ClientSession() as session:
        asyncio.create_task(background_scanner(websocket, session, stats, tried))
        await check_username("alandersej", session, websocket, stats)

        while True:
            try:
                data = await websocket.receive_text()
                message = json.loads(data)
                if message.get("type") == "search":
                    username = message.get("username", "").lower()
                    if username and all(c in characters for c in username) and 3 <= len(username) <= 16:
                        await manual_check(username, session, websocket)
                    else:
                        await websocket.send_json({
                            "type": "search_result",
                            "name": username,
                            "status": "invalid"
                        })
            except Exception as e:
                print(f"[WS ERROR] {e}")

async def background_scanner(websocket, session, stats, tried):
    while True:
        name = ''.join(random.choices(characters, k=USERNAME_LENGTH))
        if name in tried:
            continue
        tried.add(name)
        await check_username(name, session, websocket, stats)
        await asyncio.sleep(REQUEST_DELAY)

async def check_username(name, session, websocket, stats):
    url = f"https://api.mojang.com/users/profiles/minecraft/{name}"
    headers = {
        "User-Agent": "Mozilla/5.0 MC Username Checker"
    }
    try:
        async with session.get(url, timeout=10, headers=headers) as response:
            stats["total"] += 1
            if response.status in [204, 404]:
                stats["available"] += 1
                status = "available"
                print(f"[AVAILABLE] {name}")
            elif response.status == 200:
                stats["taken"] += 1
                status = "taken"
            else:
                stats["errors"] += 1
                status = "error"
    except Exception as e:
        stats["errors"] += 1
        status = "error"
        print(f"[ERROR] {name}: {e}")

    await websocket.send_json({
        "name": name,
        "status": status,
        "stats": stats
    })

async def manual_check(name, session, websocket):
    url = f"https://api.mojang.com/users/profiles/minecraft/{name}"
    headers = {
        "User-Agent": "Mozilla/5.0 MC Username Checker"
    }
    try:
        async with session.get(url, timeout=10, headers=headers) as response:
            if response.status in [204, 404]:
                status = "available"
            elif response.status == 200:
                status = "taken"
            else:
                status = "error"
    except:
        status = "error"

    await websocket.send_json({
        "type": "search_result",
        "name": name,
        "status": status
    })
