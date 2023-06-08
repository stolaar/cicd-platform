import { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { IRootProvider } from "./types"
import { createTheme, ThemeProvider } from "@mui/material"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
})

const theme = createTheme()

export const RootProvider: FC<IRootProvider> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
