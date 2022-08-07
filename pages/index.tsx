import Head from "next/head";
import React from "react";

import Home from "@/components/home";

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
          content="https://lh3.googleusercontent.com/pw/AL9nZEWuD4_R02bQF0pzeEDWy4RVBEAfOdN4JE2bU-ZN_gBE4VqlSreBhd7_6OBa2lhPDupr0T6AXJt9nJt7VBT8buMhTu7RumAKTWwTkdGQMNqp7N_LIRj0fks6-HjBZq4_l88_u_rKVLZSAYpN21R0rPlYBw=w1024-h683-no?authuser=0"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
