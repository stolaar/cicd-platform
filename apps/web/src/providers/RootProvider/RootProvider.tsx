import { FC } from "react"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { IRootProvider } from "./types"
import { ThemeProvider } from "@mui/material"
import { theme } from "../../theme"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
  queryCache: new QueryCache({
    onError: async (error, query) => {
      try {
        if (query?.meta?.type === "getRepositories") return
      } catch (err) {
        throw error
      }
    },
  }),
})

export const RootProvider: FC<IRootProvider> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
