
'use client';
import { useEffect, useRef, useCallback }  from "react";

import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

const open = createEvent('open');
const closed = createEvent('closed');
const error = createEvent('error');

const wsStatus = createStore('closed')
  .on(open, () => 'open')
  .on(closed, () => 'closed')
  .on(error, () => 'error')

wsStatus.watch(state => console.log('ws', state));

/**
 * @param wsURL {String}
 * @param onMessage {function}
 * @param onError {function}
 * @returns {[Object, function]}
 */

export function useWebSocket(wsURL, onMessage, onError) {
  const status = useStore(wsStatus);
  const socketRef = useRef();

  function handleError(err) {
    error();
    onError(err.message);
  }

  useEffect(() => {
    const socket = new WebSocket(wsURL);
    socketRef.current = socket;
    socketRef.current.onopen = open;
    socketRef.current.onclose = closed;
    socketRef.current.onerror = handleError;
    socketRef.current.onmessage = msg => onMessage(msg);
    return () => {
      socketRef.current.onopen = null;
      socketRef.current.onclose = null;
      socketRef.current.onmessage = null;
    };
  }, []);

  const sendMessage = useCallback(
    message => {
      socketRef.current.send(JSON.stringify(message));
    },
    [socketRef]
  );
  return [status, sendMessage];
}


export function Login_S() {
  const [wsStatus, sendMessage] = useWebSocket('ws://localhost:4004', msg =>
    console.log(msg)
  );

  useEffect(() => {
    if (wsStatus === 'open') {
      // sendMessage({ type: 'ready' });
      sendMessage({
        'message_id': 'asd2wd23wdacs',
        'request_type': 'question:message',
        'request': {
          'question': '⚡Ударила молния⚡'
        }
      });
    }
  }, [wsStatus]);
}

