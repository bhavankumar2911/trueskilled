import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

axios.interceptors.request.use((request) => {
  request.baseURL = process.env.NEXT_PUBLIC_API_HOST;
  request.withCredentials = true;

  return request;
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
