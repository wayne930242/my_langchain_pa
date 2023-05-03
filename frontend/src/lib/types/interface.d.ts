export interface IChatResponse {
  content: string
  additional_kwargs: any
  error?: string
  success?: string
}

export interface IChatPayload {
  question: string
  history: string[][]
}

export interface IStreamResponse {
  sender: 'bot' | 'human'
  message: string
  message_type: 'start' | 'stream' | 'end' | 'error' | 'info'
}
