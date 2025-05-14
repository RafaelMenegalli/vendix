import "@/styles/globals.scss";
import "rsuite/dist/rsuite.min.css";
import 'izitoast/dist/css/iziToast.min.css';
import type { AppProps } from "next/app";
import { CustomProvider } from "rsuite";
import { ptBR } from "rsuite/esm/locales";
import { Layout } from "@/components/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <CustomProvider locale={ptBR} theme={theme}>
      <Layout setTheme={setTheme} theme={theme}>
        <Component {...pageProps} />
      </Layout>
    </CustomProvider>
  );
}
