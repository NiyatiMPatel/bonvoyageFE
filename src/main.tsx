import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/UserContext.tsx";
import App from "./App.tsx";
import "./index.css";
import SearchContextProvider from "./context/SearchContext.tsx";

//  QueryClient serves as a centralized state manager for managing the state of queries and mutations in application. It is responsible for caching query results, handling background refetching, managing query statuses, and more.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24, //24HoursInMs
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* This provider ensures that every component within its scope can access the same queryClient instance without the need to pass it explicitly as a prop through multiple levels */}
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SearchContextProvider>
        <App />
        </SearchContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
