import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import ReactMarkdown from 'react-markdown'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'

export default function Home() {
  const [userInput, setUserInput] = useState<string>('')
  const [history, setHistory] = useState<string[][]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState([
    {
      message: 'Hi there! How can I help?',
      type: 'apiMessage',
    },
  ])

  const messageListRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Auto scroll chat to bottom
  useEffect(() => {
    if (!messageListRef.current) return
    const messageList = messageListRef.current
    messageList.scrollTop = messageList.scrollHeight
  }, [messages])

  // Focus on text field on load
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: 'Oops! There seems to be an error. Please try again.',
        type: 'apiMessage',
      },
    ])
    setLoading(false)
    setUserInput('')
  }

  // Handle form submission
  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()

    if (userInput.trim() === '') {
      return
    }

    setLoading(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: 'userMessage' },
    ])

    // Send user question and history to API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userInput, history: history }),
    })

    if (!response.ok) {
      handleError()
      return
    }

    // Reset user input
    setUserInput('')
    const data = await response.json()

    if (data.result.error === 'Unauthorized') {
      handleError()
      return
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data.result.success, type: 'apiMessage' },
    ])
    setLoading(false)
  }

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  // Keep history in sync with messages
  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([
        [
          messages[messages.length - 2].message,
          messages[messages.length - 1].message,
        ],
      ])
    }
  }, [messages])

  return (
    <>
      <Head>
        <title>LangChain Chat</title>
        <meta name="description" content="LangChain documentation chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                // The latest message sent by the user will be animated while waiting for a response
                <div
                  key={index}
                  className={
                    message.type === 'userMessage' &&
                    loading &&
                    index === messages.length - 1
                      ? styles.usermessagewaiting
                      : message.type === 'apiMessage'
                      ? styles.apimessage
                      : styles.usermessage
                  }
                >
                  {/* Display the correct icon depending on the message type */}
                  {message.type === 'apiMessage' ? (
                    <Avatar
                      alt="AI"
                      sx={{ width: 30, height: 30 }}
                      src="/aiicon-square.png"
                    />
                  ) : (
                    <Avatar
                      alt="ME"
                      sx={{ width: 30, height: 30 }}
                      src="/usericon.png"
                    />
                  )}
                  <div className={styles.markdownanswer}>
                    {/* Messages are being rendered in Markdown format */}
                    <ReactMarkdown linkTarget={'_blank'}>
                      {message.message}
                    </ReactMarkdown>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? 'Waiting for response...' : 'Type your question...'
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.loadingwheel}>
                    <CircularProgress color="inherit" size={20} />{' '}
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
          <div className={styles.footer}></div>
        </div>
      </main>
    </>
  )
}
