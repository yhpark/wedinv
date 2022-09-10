import { GetServerSideProps } from "next";
import Head from "next/head";

import Rsvp from "@/components/home/rsvp";

const RsvpPage = () => {
  return (
    <>
      <Head>
      <title>김민하 ♡ 이준영</title>
      <meta
        name="description"
        content="김민하 ♡ 이준영 2022년 9월 25일에 결혼합니다."
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="김민하 ♡ 이준영 청첩장" />
      <meta
        property="og:description"
        content="2022년 9월 25일에 결혼합니다."
      />
      <meta
        property="og:image"
        content="https://minha-joonyoung-wedding.vercel.app/photos/p18.jpeg"
      />
      </Head>
      <Rsvp />
    </>
  );
};

export default RsvpPage;
