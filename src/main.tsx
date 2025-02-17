import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClientConfig.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    {
      import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )
      }
    </QueryClientProvider>
    
  </StrictMode>,
)
