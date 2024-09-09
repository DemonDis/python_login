import { createEffect, createEvent, createStore, merge } from "effector"
import nanoid from "nanoid"
import { parseObject, request } from "jsonrpc-lite"

// const wsURL = `ws://localhost:${process.env.WS_PORT}`
const wsURL = `ws://localhost:4004`
const awaitingMap = new Map()

let socket

const open = createEvent()
const closed = createEvent()
const error = createEvent()
const onMessage = createEvent()
export const connect = createEvent()
export const disconnect = createEvent()

export const fetch = createEffect("fetch")

const $status = createStore("closed")

onMessage
  .map(({ data }) => JSON.parse(data))
  .watch((payload) => {
    const {
      payload: { id, result },
      type,
    } = parseObject(payload)

    const { resolve, reject } = awaitingMap.get(id)
    if (type === "error") {
      reject(result)
    }
    awaitingMap.delete(id)
    resolve(result)
  })

fetch.use(({ method, params }) => {
  const id = nanoid()
  socket.send(request(id, method, params))

  return new Promise((resolve, reject) => {
    awaitingMap.set(id, { resolve, reject })
  })
})

fetch.watch((payload) => console.log(`Запрос`, payload))
fetch.done.watch((payload) => console.log("Ответ на запрос", payload))
fetch.fail.watch((payload) => console.log("Ошибка", payload))

open.watch(() => {
  console.info("connect ready")
})

closed.watch(({ code, reason }) => {
  console.warn(`[close] Connection is closed, code=${code} reason=${reason}`)
})

error.watch((err) => {
  console.error(`[error] ${err.message}`)
})

merge([closed, error]).watch(() => cleanSocket())

$status
  .on(open, () => "open")
  .on(closed, () => "closed")
  .on(error, () => "error")

$status.watch((state) => console.log(`websocket is ${state}`))

disconnect.watch(() => {
  console.warn("websocket connection is disconnect")
  socket.close()
})

connect.watch(() => {
  try {
    console.info(`Try to connect on ${wsURL}`)
    socket = new WebSocket(wsURL)
  } catch (error) {
    throw new Error(error.message)
  }

  socket.addEventListener("open", (event) => open(event))
  socket.onclose = ({ wasClean, code, reason }) =>
    closed({ wasClean, code, reason })
  socket.addEventListener("error", (err) => error(err))
  socket.addEventListener("message", (msg) => onMessage(msg))
})

function cleanSocket() {
  socket.addEventListener("open", null)
  socket.onclose = null
  socket.addEventListener("error", null)
  socket.addEventListener("message", null)
}