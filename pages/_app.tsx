import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TodosProvider, ModalProvider } from "../context/";
import { Layout } from "../layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <TodosProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TodosProvider>
    </ModalProvider>
  );
}
