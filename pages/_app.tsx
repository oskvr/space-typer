import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <script src="https://cdn-tailwindcss.vercel.app/" defer></script>
    </Head>
    <div className="min-h-screen flex flex-col bg-zinc-900 text-zinc-100 space-background">
      <header className="py-5 px-20">
        <nav className="flex items-center justify-between">
          <a href="#" className="text-2xl font-mono">Space Typer</a>
          <a href="#">Sign in</a>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  </>
  )
}

export default MyApp
