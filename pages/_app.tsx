import type { AppProps } from "next/app";
import { Reset } from "styled-reset";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
