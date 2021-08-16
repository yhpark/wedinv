import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt } from "iconoir-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled, { css } from "styled-components";

import coverPic from "@/public/photos/cover_min.jpg";
import mapPic from "@/public/photos/map.gif";
import Modal from "@/components/modal";
import {
  BoxShadowStyle,
  Main,
  SectionHeader,
  SectionHr,
  TextSansStyle,
} from "./index.styles";
import WriteTalk from "./WriteTalk";
import { Chat } from "./types";

const Header = styled.h1`
  display: inline-block;
  margin: 40px 0;

  font-size: 20px;
  font-weight: 500;
  line-height: 2.5;

  hr {
    width: 70%;
    margin: 0 auto;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

const CoverPicWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 30px;
  overflow: hidden;
  line-height: 0;
`;

const GreetingP = styled.p`
  margin: 30px 0;
`;

const CallWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px 0;
  > * {
    margin: 0 15px;
  }
`;

const CallButtonWrap = styled.div<{ bgColor: string }>`
  ${TextSansStyle}
  font-size: 13px;

  svg {
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
    width: 30px;
    height: 30px;
    color: white;
    padding: 15px;
    border-radius: 30px;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

type CallButtonProps = {
  icon: React.ReactNode;
  bgColor: string;
  label: string;
};

const CallButton = ({ icon, bgColor, label }: CallButtonProps) => (
  <>
    <CallButtonWrap bgColor={bgColor}>
      {icon}
      {label}
    </CallButtonWrap>
  </>
);

const WeddingPhotoGallery = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  li {
    height: 200px;
    flex-grow: 1;
    margin: 4px;
  }

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
`;

const SliderWrap = styled.div`
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    div {
      outline: none;
    }
    img {
      width: 100%;
    }
  }
`;

const MapButton = styled.a`
  ${TextSansStyle}
  padding: 8px 14px 8px 10px;
  border: 0;
  border-radius: 18px;
  margin: 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: #f3f3f3;
  > svg {
    margin-right: 4px;
    vertical-align: text-bottom;
  }
`;

const GiveWrap = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 2;
`;

const CopyTextButton = styled.button`
  padding: 0;
  border: none;
  background: none;

  svg {
    width: 18px;
    height: 18px;
    padding: 0 4px;
    color: #999;
    vertical-align: text-bottom;
  }
`;
const CopyText = ({ text }: { text: string }) => {
  const handleCopyText = () => navigator.clipboard.writeText(text);
  return (
    <>
      {text}
      <CopyTextButton onClick={handleCopyText}>
        <Copy />
      </CopyTextButton>
    </>
  );
};

const WriteSectionSubHeader = styled.div`
  padding: 0 20px;
  margin-top: -58px;
  color: #666;
  p:first-child {
    float: left;
  }
  p:last-child {
    float: right;
  }
`;

const WriteButton = styled.button<{ visible: boolean }>`
  ${TextSansStyle}
  ${({ visible }) =>
    visible
      ? css`
          bottom: 45px;
        `
      : css`
          bottom: -100px;
        `}

  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  width: calc(100% - 40px);
  max-width: calc(400px - 40px);
  padding: 16px;
  border: 0;
  border-radius: 8px;

  color: white;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 136, 170, 0.9);

  ${BoxShadowStyle}

  transition: bottom 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
`;

const ChatWrap = styled.div`
  position: relative;
  padding: 0 20px;
  margin-bottom: 120px;
`;

const WriteButtonTrigger = styled.div`
  position: absolute;
  top: 100px;
`;

const ChatBubbleWrap = styled.div<{ party: Chat["party"] }>`
  ${TextSansStyle}
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  svg {
    ${({ party }) =>
      party === "BRIDE"
        ? css`
            float: right;
            background: #c2e0a3;
          `
        : css`
            float: left;
            background: #abdaab;
          `}
    width: 22px;
    height: 22px;
    color: white;
    padding: 8px;
    border-radius: 20px;
  }
  div {
    ${({ party }) =>
      party === "BRIDE"
        ? css`
            margin-right: 46px;
            text-align: right;
          `
        : css`
            margin-left: 46px;
            text-align: left;
          `}
    line-height: 1.3;
    p {
      text-align: left;
      word-break: break-all;
      overflow-wrap: break-word;
      display: inline-block;
      padding: 10px 16px;
      ${({ party }) =>
        party === "BRIDE"
          ? css`
              border-radius: 20px 4px 20px 20px;
            `
          : css`
              border-radius: 4px 20px 20px 20px;
            `}
      margin: 6px 0 0 0;
      background: #eee;
    }
  }
`;

type ChatBubbleProps = { chat: Chat };
const ChatBubble = ({ chat }: ChatBubbleProps) => {
  return (
    <ChatBubbleWrap party={chat.party}>
      {chat.party === "BRIDE" ? <EmojiLookLeft /> : <EmojiLookRight />}
      <div>
        {chat.author}
        <br />
        <p>{chat.msg}</p>
      </div>
    </ChatBubbleWrap>
  );
};

const Home = () => {
  const [isGalleryModalShown, setGalleryModalShown] = useState(false);
  const [isWriteModalShown, setWriteModalShown] = useState(false);
  const [isWriteButtonShown, setWriteButtonShown] = useState(false);

  const sliderRef = useRef<Slider>(null);
  const writeButtonTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!writeButtonTriggerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setWriteButtonShown(entry.isIntersecting);
    });
    observer.observe(writeButtonTriggerRef.current);

    return () => observer.disconnect();
  }, [writeButtonTriggerRef]);

  const sampleChat1: Chat = {
    author: "이준영",
    party: "BRIDE",
    msg: "축하해!!!",
    created: new Date(),
  };
  const sampleChat2: Chat = {
    author: "이준영",
    party: "GROOM",
    msg: "호어엉이!!",
    created: new Date(),
  };

  const handlePhotoClick = (i: number) => {
    sliderRef.current?.slickGoTo(i, true);
    setGalleryModalShown(true);
  };

  const handleGalleryModalClose = () => setGalleryModalShown(false);

  const handleWriteButtonClick = () => setWriteModalShown(true);

  const handleWriteModalClose = () => setWriteModalShown(false);

  return (
    <Main>
      <Header>
        박영훈
        <hr />
        김현주
      </Header>
      <CoverPicWrap>
        <Image src={coverPic} />
      </CoverPicWrap>
      <p>
        2021년 10월 3일 일요일 오후 1시
        <br />
        반포 JW 메리어트 호텔 5층 그랜드볼룸
      </p>
      <SectionHr />

      <SectionHeader>결혼합니다.</SectionHeader>
      <GreetingP>
        청명한 가을날
        <br />
        새로이 시작하는 작은 사랑이
        <br />
        보다 크고 깊은 사랑이 되려고 합니다.
        <br />
        함께 자리하시어 축복해 주시면
        <br />
        더없는 기쁨이겠습니다.
      </GreetingP>
      <GreetingP>
        김종오 · 강경자의 장녀 현주
        <br />
        박민양 · 최승현의 차남 영훈
      </GreetingP>
      <CallWrap>
        <CallButton
          icon={
            <a href="tel:01071056849">
              <EmojiLookRight />
            </a>
          }
          bgColor="#abdaab"
          label="신랑측에 연락하기"
        />
        <CallButton
          icon={
            <a href="tel:01073692869">
              <EmojiLookLeft />
            </a>
          }
          bgColor="#c2e0a3"
          label="신부측에 연락하기"
        />
      </CallWrap>
      <SectionHr />
      <WeddingPhotoGallery>
        {Array.from(Array(14), (_, i) => i).map((i) => (
          <li key={i}>
            <img
              role="button"
              src={`/photos/p${i + 1}.jpeg`}
              onClick={() => handlePhotoClick(i)}
            />
          </li>
        ))}
      </WeddingPhotoGallery>
      <Modal shown={isGalleryModalShown} handleClose={handleGalleryModalClose}>
        <SliderWrap onClick={handleGalleryModalClose}>
          <Slider
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            dots={false}
            ref={sliderRef}
          >
            {Array.from(Array(14), (_, i) => i + 1).map((i) => (
              <div key={i}>
                <img src={`/photos/p${i}.jpeg`} />
              </div>
            ))}
          </Slider>
        </SliderWrap>
      </Modal>
      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Image src={mapPic} width="400px" />
      <p>
        서울 서초구 신반포로 176
        <br />
        반포 JW 메리어트 호텔 5층 그랜드볼룸
      </p>
      <MapButton href="https://place.map.kakao.com/8005133">
        <PinAlt color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href="https://map.naver.com/v5/entry/place/11583195">
        <PinAlt color="#66BB66" /> 네이버지도
      </MapButton>
      <SectionHr />
      <SectionHeader>💸 마음 전하실 곳</SectionHeader>
      <GiveWrap>
        <p>
          <strong>신랑측</strong> (박영훈)
          <br />
          <CopyText text="국민은행 867701-04-035141" />
        </p>
        <p>
          <strong>신부측</strong> (김현주)
          <br />
          <CopyText text="우리은행 1002-291-920831" />
        </p>
      </GiveWrap>
      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <WriteSectionSubHeader>
        <p>신랑측</p>
        <p>신부측</p>
      </WriteSectionSubHeader>
      <div style={{ clear: "both" }} />
      <ChatWrap>
        <WriteButtonTrigger ref={writeButtonTriggerRef} />
        <ChatBubble chat={sampleChat1} />
        <ChatBubble chat={sampleChat2} />
      </ChatWrap>
      <WriteButton
        visible={isWriteButtonShown}
        onClick={handleWriteButtonClick}
      >
        😍 나도 한마디
      </WriteButton>
      <Modal shown={isWriteModalShown} handleClose={handleWriteModalClose}>
        <WriteTalk />
      </Modal>
    </Main>
  );
};

export default Home;
