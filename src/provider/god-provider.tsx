"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
export default function GodProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        {children} <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
