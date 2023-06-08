import "@styles/globals.css"
import type { AppProps } from "next/app"
import { RootProvider } from "@providers"
import { AppLayout } from "../layout/AppLayout/AppLayout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RootProvider>
  )
}
