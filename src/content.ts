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
  htmlTitle: "박경훈 ♥ 최정연",
  htmlDesc: "박경훈 ♥ 최정연 4월 15일에 결혼합니다.",
  ogTitle: "박경훈 ♥ 최정연 청첩장",
  ogDesc: "4월 15일에 결혼합니다.",
  ogImageUrl:
    "https://drive.google.com/uc?id=1JI-G5k9itjrbWOKKNLIknOdNICojcMvQ",

  groomFullName: "박경훈",
  brideFullName: "최정연",
  datetime: "2023년 4월 15일 토요일 낮 12시",
  venue: {
    desc: "롯데호텔 서울 2층 크리스탈볼룸",
    address: "서울 중구 을지로 30 (소공동 1번지)",
    kakaoMapUrl: "https://place.map.kakao.com/7855876",
    naverMapUrl: "https://map.naver.com/v5/entry/place/11583194",
  },
  greeting: {
    title: "결혼합니다.",
    content: [
      `저희 둘 소중한 만남으로
       축복속에서 하나가 되려 합니다.
       서로 존중하고 신뢰를 쌓으며
       사랑을 키워나갈 수 있도록
       오셔서 자리를 빛내주시면 감사하겠습니다.`,
      `박민양 • 최승현의 아들 경훈
       최종빈 • 박지호의 딸 정연`,
    ],
  },
  groomContact: "tel:01039936849",
  brideContact: "tel:01088764641",
  galleryThumbPosition: {
    "p01.jpeg": "bottom",
    "p06.jpeg": "top",
    "p07.jpeg": "top",
    "p09.jpeg": "bottom",
    "p101.jpeg": "top",
  },
  groomGive: [
    { name: "박경훈", account: "신한은행 110-436-194436" },
    { name: "박민양", account: "국민 020-24-0051-197" },
    { name: "최승현", account: "카카오뱅크 3333-0467-07506" },
  ],
  brideGive: [
    { name: "최정연", account: "국민은행 772002-04-272922" },
    { name: "최종빈", account: "국민은행 030-21-0541-981" },
    { name: "박지호", account: "국민은행 043-24-0439-601" },
  ],
};

export default myContentSpec;
