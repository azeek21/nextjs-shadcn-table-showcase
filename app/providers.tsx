"use client";

import { ThemeProvider } from "@/lib/components/providers/theme-provider";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // I am doing this because in domain of this project, server is NOT the source of thruth.
        // We don't mutate server data, we mutate the cache directly from mutations with onSuccess callbacks.
        // I'm gonna do use mutations still because it'll be easier to refactor if we move source of truth to server in the future.
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
