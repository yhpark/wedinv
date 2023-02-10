import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Reset } from "styled-reset";
import { SWRConfig } from "swr";
import "../global.css";

const swrConfig = {
  refreshInterval: 3000,
  fetcher: (url: string) => fetch(url).then((res) => res.json()),
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname.indexOf("yhpark.io") < 0) return;

    (async () => {
      const LogRocket = (await import("logrocket")).default;
      LogRocket.init("ps9ryu/wedinv");
    })();
  }, []);

  return (
    <>
      <Reset />
      <SWRConfig value={swrConfig}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
export default MyApp;
