import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "./components/ui/toast/toaster.tsx";
import Loading from "@/components/loading/Loading";
import AuthProvider from "react-auth-kit";
import { store } from "@/system/stores/authStore.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={store}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Toaster />
            <App />
          </BrowserRouter>
        </Suspense>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
    </QueryClientProvider>
  </StrictMode>
);
