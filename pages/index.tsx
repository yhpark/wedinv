import Head from "next/head";
import React from "react";

import Home from "@/home/components";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>YH + HJ</title>
        <meta name="description" content="박영훈, 김현주 결혼합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
