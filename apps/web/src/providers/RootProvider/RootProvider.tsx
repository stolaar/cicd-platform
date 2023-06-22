import { FC } from "react"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { IRootProvider } from "./types"
import { ThemeProvider } from "@mui/material"
import { theme } from "../../theme"

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

export const RootProvider: FC<IRootProvider> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
