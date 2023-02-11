import { GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";

import Home from "@/components/home";
import myContentSpec, { Content } from "@/content";

type HomePageProps = { content: Content };

const HomePage = ({ content: c }: HomePageProps) => (
  <>
    <Head>
      <title>{c.htmlTitle}</title>
      <meta name="description" content={c.htmlDesc} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={c.ogTitle} />
      <meta property="og:description" content={c.ogDesc} />
      <meta property="og:image" content={c.ogImageUrl} />
    </Head>
    <Home content={c} />
  </>
);
export default HomePage;

export const getStaticProps: GetStaticProps = () => {
  const photos: Content["photos"] = fs
    .readdirSync("./public/photos/gallery")
    .sort()
    .map((fname) => ({
      url: "/photos/gallery/" + fname,
      ...(myContentSpec.galleryThumbPosition[fname]
        ? { objectPosition: myContentSpec.galleryThumbPosition[fname] }
        : {}),
    }));
  const content: Content = { ...myContentSpec, photos };
  return { props: { content } };
};
