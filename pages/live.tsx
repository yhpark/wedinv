import { GetServerSideProps } from "next";
import Head from "next/head";

import Live from "@/components/home/live";

const LivePage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="이준영 ♡ 김민하 9월 25일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        
        <meta property="og:description" content="9월 25일에 결혼합니다." />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?id=1kf4TQN50LQyEybKT844g6CLq7nXeG6cl"
        />
      </Head>
      <Live />
    </>
  );
};

export default LivePage;

let liveUrlCache = { url: "", when: 0 };
const getLiveUrl = async () => {
  if (liveUrlCache.when < Date.now() - 10000) {
    const liveUrl = await fetch(
      "https://docs.google.com/document/export?format=txt&id=1nTE3m6M9WOqPU8vPUNemJhyQUCdvujM9MAVWsjn4H-g"
    )
      .then((r) => r.text())
      .then((url) => url.trim());
    liveUrlCache = { url: liveUrl, when: Date.now() };
  }
  return liveUrlCache.url;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const liveUrl = await getLiveUrl();
  if (liveUrl.startsWith("http")) {
    return {
      redirect: {
        destination: liveUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
