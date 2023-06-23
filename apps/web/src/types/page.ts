import { AppProps } from "next/app"
import { NextPage } from "next/types"
import { ReactElement, ReactNode } from "react"

// eslint-disable-next-line @typescript-eslint/ban-types
export type TPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type TAppProps = AppProps & {
  Component: TPage
}
