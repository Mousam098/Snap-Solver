import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MantineProvider>
      <AuthProvider>
        <App />
        <Toaster position="bottom-center" reverseOrder={false} />
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);
