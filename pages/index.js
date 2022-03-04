import Head from "next/head"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

export default function Index2() {
  const [quote, setQuote] = useState("Generate Random Quotes...")
  const [author, setAuthor] = useState("Getting Author Name...")
  const [quotesid, setInput] = useState("")

  const copied = () => {
    toast.dark("📝 Copied", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  }

  const subscribe = e => {
    e.preventDefault()
    if (quotesid == 0) {
      console.log("Empty value")
      toast.error("🤖 Empty value", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      })
      return false
    }
    const users = encodeURIComponent(quotesid)
    window.open(`/${users}/`, "_blank", "noopener")
  }

  useEffect(() => {
    fetchWord()
  }, [])

  const fetchWord = async () => {
    const response = await fetch("https://cycling.up.railway.app/random")
    const data = await response.json()
    setQuote(data.cycling[0].quotes)
    setAuthor(data.cycling[0].author)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center">
        <Head>
          <meta name="HandheldFriendly" content="True" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <title>Cycling Quotes 🚴</title>
          <meta
            name="description"
            content="Get 🚴 Motivational and inspirational Quotes 🚴."
          />
        </Head>
        <form method="GET" className="m-7 flex">
          <input
            id="quotesid"
            name="quotesid"
            method="POST"
            className="w-15 text-center rounded-l-lg p-0 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Enter No 1 to 90"
            autoComplete="off"
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={subscribe}
            className="w-15 px-4 rounded-r-lg bg-purple-400 text-gray-800 font-bold p-4 uppercase border-purple-500 border-t border-b border-r"
          >
            Get Quote
          </button>
        </form>
        <div className="dark:bg-pink-200 dark:border-pink-200 bg-white rounded-2xl border shadow-xl p-10 max-w-lg mt-6">
          <div className="w-full flex flex-col justify-between dark:bg-gray-800 bg-blue-300 dark:border-gray-700 rounded-lg border border-blue-400 mb-6 py-5 px-4">
            <p className="text-gray-800 dark:text-gray-100 text-base">
              {"📔 " + quote}
              <br />
              <br /> {"📝 Author: " + author}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ToastContainer />
            <CopyToClipboard text={quote}>
              <button
                className="bg-green-400 text-black font-medium py-2 px-4 rounded-full mt-4"
                onClick={copied}
              >
                📝 Copy
              </button>
            </CopyToClipboard>
            &nbsp;
            <button
              className="bg-green-400 text-black font-medium py-2 px-4 rounded-full mt-4"
              type="button"
              onClick={() => fetchWord()}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
