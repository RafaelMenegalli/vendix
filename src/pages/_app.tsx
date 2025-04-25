import "@/styles/globals.scss";
import "rsuite/dist/rsuite.min.css";
import type { AppProps } from "next/app";
import { CustomProvider } from "rsuite";
import { ptBR } from "rsuite/esm/locales";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider locale={ptBR} theme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CustomProvider>
  );
}
