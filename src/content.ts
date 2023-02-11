export type Content = ContentSpec & {
  photos: { url: string; objectPosition?: string }[];
};

export type ContentSpec = {
  // meta
  htmlTitle: string;
  htmlDesc: string;
  ogTitle: string;
  ogDesc: string;
  ogImageUrl: string;

  // card
  groomFullName: string;
  brideFullName: string;
  datetime: string;
  venue: {
    desc: string;
    address: string;
    kakaoMapUrl: string;
    naverMapUrl: string;
  };
  link?: { label: string; url: string };
  greeting: { title: string; content: string[] };
  groomContact: string;
  brideContact: string;
  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-position */
  galleryThumbPosition: { [filename: string]: string };
  groomGive: { name: string; account: string }[];
  brideGive: { name: string; account: string }[];
};

const myContentSpec: ContentSpec = {
  htmlTitle: "박영훈 ♡ 김현주",
  htmlDesc: "박영훈 ♡ 김현주 10월 3일에 결혼합니다.",
  ogTitle: "박영훈 ♡ 김현주 청첩장",
  ogDesc: "10월 3일에 결혼합니다.",
  ogImageUrl:
    "https://drive.google.com/uc?id=1kf4TQN50LQyEybKT844g6CLq7nXeG6cl",

  groomFullName: "박영훈",
  brideFullName: "김현주",
  datetime: "2021년 10월 3일 일요일 오후 1시",
  venue: {
    desc: "반포 JW 메리어트 호텔 5층 그랜드볼룸",
    address: "서울 서초구 신반포로 176",
    kakaoMapUrl: "https://place.map.kakao.com/8005133",
    naverMapUrl: "https://map.naver.com/v5/entry/place/11583195",
  },
  link: { label: "📹 결혼식 생중계 보러가기", url: "/live" },
  greeting: {
    title: "결혼합니다.",
    content: [
      `청명한 가을날
        새로이 시작하는 작은 사랑이
        보다 크고 깊은 사랑이 되려고 합니다.
        함께 자리하시어 축복해 주시면
        더없는 기쁨이겠습니다.`,
      `김종오 · 강경자의 장녀 현주
        박민양 · 최승현의 차남 영훈`,
    ],
  },
  groomContact: "tel:01071056849",
  brideContact: "tel:01073692869",
  galleryThumbPosition: {}, // e.g. { "p03.jpeg": "bottom" },
  groomGive: [{ name: "박영훈", account: "카카오뱅크 3333-07-0052253" }],
  brideGive: [{ name: "김현주", account: "우리은행 1002-291-920831" }],
};

export default myContentSpec;
