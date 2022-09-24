import { GetServerSideProps } from "next";
import Head from "next/head";


import Meeting from "@/components/home/meeting";
import Link from 'next/link'

const MeetingPage = () => {

  return (
    <>
      <Head>
      <title>김민하 ♡ 이준영 결혼식 소개팅 이벤트</title>
      <meta
        name="description"
        content="김민하 ♡ 이준영 2022년 9월 25일 결혼식 소개팅 이벤트!"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="김민하 ♡ 이준영 9월 25일 결혼식 소개팅 이벤트" />
      <meta
        property="og:description"
        content="김민하 ♡ 이준영 2022년 9월 25일 결혼식 소개팅 이벤트!"
      />
      <meta
        property="og:image"
        content="https://minha-joonyoung-wedding.vercel.app/photos/p18.jpeg"
      />
      </Head>
      <Meeting />
    </>
  );
};

export default MeetingPage;
