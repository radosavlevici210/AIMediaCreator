import { QueryClient } from "@tanstack/react-query";

// Default query function for API calls
const defaultQueryFn = async ({ queryKey }: { queryKey: string[] }) => {
  const url = queryKey[0];
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Create a client with default query function
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const API_BASE = "";

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: any
): Promise<Response> {
  const url = `${API_BASE}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}