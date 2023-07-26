import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";

import App from "App";

import "./fonts.css";
import "./index.css";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);
