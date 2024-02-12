import { useEffect, useRef, useState } from 'react'

function Home() {
  const [message, setMessage] = useState([])
  const ws = useRef(null)

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000')
    ws.current.onopen = () => {
      console.log('Connected to server')
    }
    ws.current.onmessage = (event) => {
      console.log(event)
      setMessage(event.data)
    }
    return () => {
      ws.current.close()
    }
  }, [])

  return <h1>{message}</h1>
}

export default Home
