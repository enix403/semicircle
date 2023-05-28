import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./index.css";

const MAX_RETRIES = 5;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: MAX_RETRIES
    }
  }
});

const container = document.querySelector("#root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
