import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

const PostsData = ({ post }) => {
  const router = useRouter()

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
  const [quotesid, setInput] = useState("")
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
    window.open(`/${users}/`, "_self", "noopener")
  }

  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center">
          <br />
          <br />
          <br />
          <br />
          <p className="text-gray-800 dark:text-gray-100 text-base">
            API Error...
          </p>
        </div>
      </div>
    )
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
          <title>Cycling Quotes 🚴 by {post.cycling.author}</title>
          <meta name="description" content={post.cyclingquotes} />
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
              📔 {post.cycling.quotes} <br />
              <br /> 📝 Author: {post.cycling.author}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ToastContainer />
            <CopyToClipboard text={post.cycling.quotes}>
              <button
                className="bg-green-400 text-black font-medium py-2 px-4 rounded-full mt-4"
                onClick={copied}
              >
                📝 Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostsData

export const getStaticProps = async ({ params }) => {
  const data = await fetch(`https://cycling.up.railway.app/quotes/${params.id}`)
  const post = await data.json()
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths = async () => {
  const response = await fetch("https://cycling.up.railway.app/quotes")
  const posts = await response.json()
  if (!posts) {
    return {
      notFound: true,
    }
  }
  const paths = posts.cycling.map(post => ({
    params: { id: post.id.toString() },
  }))
  return {
    paths,
    fallback: true,
  }
}
