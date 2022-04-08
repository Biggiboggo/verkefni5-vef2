import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <section>
        <Component {...pageProps} />
    </section>
  </>
  )
}
export default MyApp
