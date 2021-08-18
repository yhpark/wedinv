import Head from "next/head";
import React from "react";

import Home from "@/home/components";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>박영훈 ♡ 김현주</title>
        <meta
          name="description"
          content="박영훈 ♡ 김현주 10월 3일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="박영훈 ♡ 김현주 청첩장" />
        <meta
          property="og:description"
          content="10월 3일에 결혼합니다."
        />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?id=1kf4TQN50LQyEybKT844g6CLq7nXeG6cl"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
