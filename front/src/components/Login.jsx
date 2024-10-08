'use client';
import React from "react";
import { Button } from 'primereact/button';
import { v4 as uuidv4 } from 'uuid';

const question = {
  'message_id': uuidv4(),
  'request_type': 'question:message',
  'request': {
    'question': '⚡Ударила молния⚡'
  }
};
const question_error = {
  'message_id': uuidv4(),
  'request_type': 'question:error',
  'request': {
    'question': '⚡Ударила молния⚡'
  }
};
const websocket = new WebSocket("ws://127.0.0.1:4004/");

export const Login = () => {
  
  function onSendMessage() {
    websocket.send(JSON.stringify(question));
  }
  function onSendMessageError() {
    websocket.send(JSON.stringify(question_error));
  }
  
  return (
    <div>
        <Button onClick={() => onSendMessage()}>SOCKET</Button>
        <Button onClick={() => onSendMessageError()}>SOCKET ERROR</Button>
    </div>
  );
}