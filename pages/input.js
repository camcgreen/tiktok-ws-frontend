import { useEffect, useRef, useState } from 'react'

function Input() {
  const [message, setMessage] = useState('')
  const ws = useRef(null)

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000')
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)
    return () => {
      ws.current.close()
    }
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    console.log('sending message', message)
    ws.current.send(message)
    setMessage('')
  }

  return (
    <form onSubmit={sendMessage}>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default Input
