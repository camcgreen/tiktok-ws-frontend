import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

function Home() {
  const [message, setMessage] = useState([])
  const ws = useRef(null)

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000')
    // ws.current = new WebSocket('ws://192.168.178.50:3000')
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)
    ws.current.onopen = () => {
      console.log('Connected to server')
      console.log(message)
    }
    ws.current.onmessage = (event) => {
      console.log(event)
      setMessage(event.data)
    }
    return () => {
      ws.current.close()
    }
  }, [])

  return (
    <>
      <Head>
        <title>TikTokFashion</title>
      </Head>
      <main className='relative w-screen h-screen-sm'>
        {
          // Hey Felix, I've put a placeholder video here that you can use with the proper src once received from the client
          // I've also added a commented out placeholder image in case you want to use that instead
        }
        <video
          src='/videos/placeholder.mp4'
          autoPlay
          muted
          loop
          className='absolute left-0 top-0 w-screen h-screen-sm object-cover'
        />
        {/* <img
          src='/images/placeholder.jpg'
          alt='Background'
          className='absolute left-0 top-0 w-screen h-screen-sm object-cover'
        /> */}
        <section className='relative w-full flex justify-between p-20 text-4xl text-white '>
          <h2 className='font-semibold'>#TikTokFashion</h2>
          <h3 className='text-end'>
            competition powered by
            <br />
            <span className='font-thin'>S H E E R L U X E</span>
          </h3>
        </section>
        <section className='absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-1/2 py-8 px-8 bg-white rounded-full flex justify-center'>
          <h1 className='text-center font-medium text-4xl'>
            {message && message.length > 0 ? message : '@TikTokHandle'}
          </h1>
        </section>
      </main>
    </>
  )
}

export default Home
