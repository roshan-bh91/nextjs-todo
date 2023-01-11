import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TodosProvider } from "../context/TodosProvider";
import { Layout } from "../layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodosProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TodosProvider>
  );
}
