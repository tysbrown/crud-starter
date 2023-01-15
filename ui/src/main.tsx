import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./global.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { QueryClient as QueryClientType } from "react-query/types/core/queryClient"

const queryClient: QueryClientType = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App client={queryClient} />
    </QueryClientProvider>
  </React.StrictMode>
)
