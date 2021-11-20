import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <script src="https://cdn-tailwindcss.vercel.app/" defer></script>
    </Head>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
