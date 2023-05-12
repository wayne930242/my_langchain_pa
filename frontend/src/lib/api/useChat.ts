import { useEffect, useState, useCallback } from 'react'

import { IChatPayload, IStreamResponse } from '../types/interface'

const WEBSOCKET_PATHS = {
  default: '/chat',
}
const API_URL = process.env.API_URL?.replace(/\/$/, '')

const getWebSocketURL = (API_URL: string | undefined, path: string) => {
  if (!API_URL) {
    API_URL = 'http://localhost:8000'
  }
  const url = new URL(API_URL)
  const protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'

  return `${protocol}//${url.host}${path}`
}

export const useChat = (
  path: keyof typeof WEBSOCKET_PATHS = 'default',
  handleStart?: () => void,
  handleDone?: () => void,
  handleError?: (error?: Event) => any
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [aiMessage, setAiMessage] = useState<string>('')

  const web_socket_url = getWebSocketURL(API_URL, WEBSOCKET_PATHS[path])

  const registerSocket = useCallback((socket: WebSocket) => {
    socket.onopen = () => {
      console.info(`Create WebSocket connection to ${web_socket_url}.`)
    }
    // handle the data received from server
    socket.onmessage = (event: MessageEvent) => {
      const data: IStreamResponse = JSON.parse(event.data)
      if (data.sender === 'bot' && data.message_type === 'stream') {
        setAiMessage(data.message)
      }
      if (data.sender === 'bot' && data.message_type === 'end') {
        if (handleDone) handleDone()
      }
      // additional response handler
    }
    socket.onerror = (error: Event) => {
      console.error(error)
      handleError?.(error)
    }
    socket.onclose = () => {
      console.info('Disconnected WebSocket connection.')
    }
    setSocket(socket)
  }, [])

  useEffect(() => {
    const ws = new WebSocket(web_socket_url, 'echo-protocol')
    registerSocket(ws)
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])

  const makeRequest = async (payload: IChatPayload) => {
    if (handleStart) handleStart()
    if (socket) {
      if (socket.readyState !== WebSocket.OPEN) {
        console.info('Reconnecting WebSocket connection.')
        const ws = new WebSocket(web_socket_url, 'echo-protocol')
        await new Promise<void>((resolve) => {
          ws.addEventListener('open', () => {
            resolve()
          })
        })
        registerSocket(ws)
        ws.send(JSON.stringify(payload))
      } else {
        socket.send(JSON.stringify(payload))
      }
    }
  }

  return {
    makeRequest,
    aiMessage,
    setAiMessage,
    socket,
  }
}
