import "@styles/globals.css"
import { RootProvider } from "@providers"
import { AppLayout } from "../layout/AppLayout/AppLayout"
import { ReactElement } from "react"
import { TAppProps } from "../types/page"

const DefaultLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: TAppProps) {
  const getLayout = Component.getLayout ?? DefaultLayout

  return (
    <RootProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </RootProvider>
  )
}
