import Head from "next/head";
import React from "react";

import Home from "@/components/home";

import thumbnailPic from "@/public/photos/thumbnail.jpeg";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>이준영 ♡ 김민하</title>
        <meta
          name="description"
          content="이준영 ♡ 김민하 2022년 9월 25일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="이준영 ♡ 김민하 청첩장" />
        <meta
          property="og:description"
          content="2022년 9월 25일에 결혼합니다."
        />
        <meta
          property="og:image"
          content={thumbnailPic}
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
