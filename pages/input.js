import { useEffect, useRef, useState } from "react";
import Head from "next/head";

function Input() {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000')
    ws.current = new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_URL}`);
    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log("sending message", message);
    ws.current.send(message);
    setShowToast(true);
    setMessage("");
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const changeBackground = (Background) => {
    event.preventDefault();
    console.log("sending message", message);
    ws.current.send("change_background " + Background);
    setShowToast(true);
    setMessage("");
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>TikTokFashion</title>
      </Head>

      <main className="w-screen h-screen-sm">
        {" "}
        <img
          src="/images/Asset 2spiral.png"
          alt="Background"
          className="absolute left-0 top-0 w-screen h-screen-sm object-cover"
          style={{ zIndex: "-10" }}
        />
        <section className="w-full flex justify-between p-20 text-2xl text-white ">
          <h2 className="font-semibold">#TikTokFashion</h2>
          <h3 className="text-end">
            competition powered by
            <br />
            <span className="font-thin">S H E E R L U X E</span>
          </h3>
        </section>
        <section className="w-3/4 absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
          {/* <h1 className='text-center font-medium text-4xl'>@TikTokHandle</h1> */}
          <form onSubmit={sendMessage} className="flex">
            <input
              className="py-8 px-8 rounded-full bg-white text-center font-medium text-2xl flex-grow mr-8"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="px-16 py-8 bg-black text-center font-medium text-2xl text-white rounded-full"
              type="submit"
            >
              Send
            </button>
          </form>
        </section>
        <div
          className="fixed right-1/2 top-4 translate-x-1/2 px-8 py-4 bg-white rounded-full transition-all"
          style={{
            transform: showToast
              ? "translate(50%, 0)"
              : "translate(50%, -100px)",
          }}
        >
          {"✅ - Message sent"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className="px-16 py-8 bg-white text-center font-medium text-2xl text-black rounded-full"
            onClick={() => changeBackground(1)}
          >
            Backgorund 1
          </button>
          <button
            className="px-16 py-8 bg-white text-center font-medium text-2xl text-black rounded-full"
            onClick={() => changeBackground(2)}
          >
            Backgorund 2
          </button>
        </div>
      </main>
    </>
  );
}

export default Input;
