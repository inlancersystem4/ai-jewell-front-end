import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import {
  QueryProvider,
  ThemeProvider,
  ReduxProvider,
  AuthProvider,
} from "@/context";
import Router from "@/routers/Router";
import "@/styles/global.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <ReduxProvider>
        <QueryProvider>
          <Router />
          <Toaster richColors closeButton position="top-right" />
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  </AuthProvider>
);
