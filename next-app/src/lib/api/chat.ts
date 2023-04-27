import ky from 'ky'
import { IChatResponse } from '../types/interface'

const BASE_URL = process.env.DJANGO_API

export const getChat = async ({ question, history }: IChatPayload) => {
  return await ky
    .post(BASE_URL + '/chat/', {
      json: {
        question,
        history,
      },
      timeout: 60000,
    })
    .json<Promise<IChatResponse>>()
}

interface IChatPayload {
  question: string
  history: string[][]
}
