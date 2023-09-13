import "../styles/globals.css"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

import Layout from "@/components/Layout"

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
