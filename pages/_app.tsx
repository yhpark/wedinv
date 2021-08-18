import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Reset } from "styled-reset";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname.indexOf("yhpark.io") < 0) return;

    (async () => {
      const LogRocket = (await import("logrocket")).default;
      LogRocket.init("ps9ryu/wedinv");
    })();
  });
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
