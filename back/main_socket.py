import os
import websockets
import json
import random
import asyncio

from src.static.request import REQUEST_SEND, REQUEST_SEND_ERROR
from src.static.answers import ANSWERS

from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("HOST")
PORT = os.getenv("PORT_SOCKER")

async def handler(websocket):
    async for message in websocket:
        request_get = json.loads(message)
        print('❓', message)
        try:
            if request_get['request_type'] == 'question:message':
                REQUEST_SEND['response']['question'] = request_get['request']['question']
                REQUEST_SEND['response']['answer'] = random.choice(ANSWERS)
                REQUEST_SEND['request_type'] = 'question:message'
                REQUEST_SEND['correlation_id'] = request_get['message_id']
                await asyncio.sleep(3)
                await websocket.send(json.dumps(REQUEST_SEND))
                print('❔ status=0 ❔', REQUEST_SEND['correlation_id'], REQUEST_SEND['request_type'])
            if request_get['request_type'] == 'question:error':
                REQUEST_SEND_ERROR['request_type'] = 'question:error'
                REQUEST_SEND_ERROR['correlation_id'] = request_get['message_id']
                REQUEST_SEND_ERROR['status_text'] = '⚠️Упс, что-то пошло не так⚠️'
                await websocket.send(json.dumps(REQUEST_SEND_ERROR))
                print('❗ status=1 ❗', REQUEST_SEND['correlation_id'], REQUEST_SEND_ERROR['request_type'])
                
        except Exception as e:            
            print('⚠️Exception⚠️', e)
async def main():
    async with websockets.serve(handler, HOST, PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())