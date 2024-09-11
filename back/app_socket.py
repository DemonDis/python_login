import websockets
import json
import asyncio

from src.static.env import *

async def handler(websocket):
    async for message in websocket:
        request_get = json.loads(message)
        print('❓', message)
        try:
            if request_get['request_type'] == 'question:message':
                await asyncio.sleep(3)
                await websocket.send(json.dumps({}))
            if request_get['request_type'] == 'question:error':
                await websocket.send(json.dumps({}))
                
        except Exception as e:            
            print('⚠️Exception⚠️', e)
async def main():
    async with websockets.serve(handler, HOST, PORT_SOCKET):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())