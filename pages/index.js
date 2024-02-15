import { useEffect, useRef, useState } from "react";
import Head from "next/head";

let characterArray = "@TikTokHandle".split("");

let backgorund1State = true;
function Home() {
  const [background1, setBackground1] = useState("/images/Asset 2spiral.png");
  const [background2, setBackground2] = useState("/images/placeholder.jpg");
  const [showBackground1, setShowBackground1] = useState(true);

  const [message, setMessage] = useState("@TikTokHandle");
  const ws = useRef(null);

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000')
    // ws.current = new WebSocket('ws://192.168.178.50:3000')
    ws.current = new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_URL}`);
    ws.current.onopen = () => {
      console.log("Connected to server");
      console.log(message);
    };
    ws.current.onmessage = (event) => {
      switch (event.data) {
        case "change_background 1":
          backgorund1State == false && setShowBackground1(true);
          backgorund1State = true;
          break;
        case "change_background 2":
          backgorund1State == true && setShowBackground1(false);
          backgorund1State = false;

          break;

        default:
          console.log(event);
          console.log(characterArray.length);

          //characterArray = message.split("");
          CharactersOneByOne(event.data);
          // characterArray.forEach((el, index) => {
          //   console.log(el + " " + index);
          // });

          // setMessage(event.data);
          break;
      }
    };
    return () => {
      ws.current.close();
    };
  }, []);

  function CharactersOneByOne(newMessage) {
    let index = 0;
    let tempArray = characterArray;
    const intervalId1 = setInterval(() => {
      if (index < tempArray.length) {
        tempArray.splice(index, 1); // Remove the printed character from the array
        const temptemp = tempArray.toString().replace(/,/g, "");
        console.log(temptemp);
        setMessage(temptemp);
        index == tempArray.length && setMessage("");
        // No need to increment index since splice() already removes the current character
      } else {
        // tempArray = temptemp;
        setMessage("");

        clearInterval(intervalId1); // Stop the interval when all characters are printed
        //characterArray = tempArray;
        //setMessage(newMessage);

        let sourceString = newMessage;
        let appendString = "";
        let indexx = 0;
        const intervalId2 = setInterval(() => {
          if (indexx < sourceString.length) {
            appendString += sourceString[indexx]; // Concatenate one character from appendString
            console.log(appendString); // Print the updated string
            indexx++;
            setMessage(appendString);
          } else {
            characterArray = newMessage.split("");
            clearInterval(intervalId2); // Stop the interval when all characters are appended
          }
        }, 100); // Append one character every 100 milliseconds
      }
    }, 100); // Print one character every second (1000 milliseconds)
  }

  return (
    <>
      <Head>
        <title>TikTokFashion</title>
      </Head>
      <main className="relative w-screen h-screen-sm">
        {
          // Hey Felix, I've put a placeholder video here that you can use with the proper src once received from the client
          // I've also added a commented out placeholder image in case you want to use that instead
        }
        {/*         <video
          src="/videos/placeholder.mp4"
          autoPlay
          muted
          loop
          className="absolute left-0 top-0 w-screen h-screen-sm object-cover"
        /> */}
        <img
          src={background1}
          alt="Background"
          style={{
            transform: `translateX(${showBackground1 ? "0%" : "100%"})`,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
          className={`absolute left-0 top-0 w-screen h-screen-sm object-cover`}
        />
        <img
          src={background2}
          style={{
            transform: `translateX(${showBackground1 ? "-100%" : "0%"})`,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
          alt="Background"
          className={`absolute left-0 top-0 w-screen h-screen-sm object-cover`}
        />
        <section className="relative w-full flex justify-between p-20 text-4xl text-white ">
          <h2 className="font-semibold">#TikTokFashion</h2>
          <h3 className="text-end">
            competition powered by
            <br />
            <span className="font-thin">S H E E R L U X E</span>
          </h3>
        </section>
        <section className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-1/2 py-8 px-8 bg-white rounded-full flex justify-center">
          <h1
            className="text-center font-medium text-4xl"
            style={{ height: "60px" }}
          >
            {message}
            {/* message && message.length > 0 ? message : "@TikTokHandle" */}
          </h1>
        </section>
      </main>
    </>
  );
}

export default Home;
