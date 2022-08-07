import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt, Heart } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled, { css } from "styled-components";
import useSWR from "swr";

import Modal from "@/components/common/Modal";
import timeDiffFormat from "@/common/utils/timeDiffFormat";
import { useSessionStorage } from "@/common/hooks/useStorage";
import coverPic from "@/public/photos/cover_min.jpg";
import mapPic from "@/public/photos/map.jpeg";
import { GetTalkListResponse, Party, Talk } from "@/talk/types";
import {
  BoxShadowStyle,
  BubbleHeadStyle,
  Main,
  SectionHeader,
  SectionHr,
  TextSansStyle,
} from "./styles";
import WriteTalk from "./talk/WriteTalk";
import EditTalk from "./talk/EditTalk";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

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

const imageSize = 28;

const LiveButton = styled.button`
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  margin: 12px 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 136, 170);

  animation: color-change 1s infinite;

  @keyframes color-change {
    0% {
      background: rgba(255, 136, 170, 0.7);
    }
    50% {
      background: rgb(255, 136, 170);
    }
    100% {
      background: rgba(255, 136, 170, 0.7);
    }
  }
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
    width: 60px;
    height: 60px;
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

const PhotoGrid = styled.ul`
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

const SliderWrap = styled.div<{ isZoomed: boolean }>`
  height: 100%;
  ${({ isZoomed }) =>
    isZoomed &&
    css`
      * {
        overflow: visible !important;
      }
    `}
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;

    ${({ isZoomed }) =>
      isZoomed &&
      css`
        &:not(.slick-active) {
          visibility: hidden;
        }
      `}

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

type PinchPhotoProps = { src: string; onZoom: (isZoomed: boolean) => void };
const PinchPhoto = ({ src, onZoom }: PinchPhotoProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const pz = useRef<QuickPinchZoom>(null);
  const handleUpdate = useCallback(
    ({ x, y, scale }) => {
      if (!imgRef.current) return;
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty("transform", value);
      onZoom(scale > 1);
    },
    [onZoom]
  );

  return (
    <QuickPinchZoom ref={pz} onUpdate={handleUpdate} draggableUnZoomed={false}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt="" />
    </QuickPinchZoom>
  );
};

type PhotoGalleryProps = { initialSlide?: number; onClose: () => void };
const PhotoGallery = ({ initialSlide, onClose }: PhotoGalleryProps) => {
  const [isZoomed, setZoomed] = useState(false);
  return (
    <SliderWrap isZoomed={isZoomed} onClick={onClose}>
      <Slider
        initialSlide={initialSlide || 0}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        dots={false}
      >
        {Array.from(Array(imageSize), (_, i) => i + 1).map((i) => (
          <div key={i}>
            <PinchPhoto onZoom={setZoomed} src={`/photos/p${i}.jpeg`} />
          </div>
        ))}
      </Slider>
    </SliderWrap>
  );
};

const MapButton = styled.a`
  ${TextSansStyle}
  display: inline-block;
  padding: 8px 16px 8px 10px;
  border: 0;
  border-radius: 18px;
  margin: 0 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: #f3f3f3;
  line-height: 1.3;
  > svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: -4px 0;
    margin-right: 4px;
  }
`;

const Button = styled.a`
  ${TextSansStyle}
  display: inline-block;
  padding: 8px 16px 8px 10px;
  border: 0;
  border-radius: 18px;
  margin: 0 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: #f3f3f3;
  line-height: 1.3;
  > svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: -4px 0;
    margin-right: 4px;
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
    width: 20px;
    height: 20px;
    padding: 2px;
    color: #999;
    vertical-align: sub;
  }
`;
const CopyText = ({ text }: { text: string }) => {
  const handleCopyText = () => {
    const fallbackCopyClipboard = (value: string) => {
      const $text = document.createElement("textarea");
      document.body.appendChild($text);
      $text.value = value;
      $text.select();
      document.execCommand("copy");
      document.body.removeChild($text);
    };

    navigator.clipboard
      .writeText(text)
      .catch(() => fallbackCopyClipboard(text))
      .then(() => alert("계좌번호가 복사 되었습니다."));
  };
  return (
    <>
      {text}
      <CopyTextButton onClick={handleCopyText} aria-label="복사">
        <Copy />
      </CopyTextButton>
    </>
  );
};

const WriteSectionSubHeader = styled.div`
  padding: 0 20px;
  margin-top: -68px;
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

const TalkWrap = styled.div`
  position: relative;
  padding: 0 20px;
  margin: 20px 0;
`;

const WriteButtonTrigger = styled.div`
  position: absolute;
  top: 100px;
  height: 100%;
`;

const TalkBubbleWrap = styled.div<{
  party: Party;
  color: string;
  selected: boolean;
}>`
  ${TextSansStyle}
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  svg {
    ${({ party, color }) => BubbleHeadStyle(party, color)}
  }
  > div {
    ${({ party }) =>
      party === "BRIDE"
        ? css`
            margin-right: 44px;
            text-align: right;
          `
        : css`
            margin-left: 44px;
            text-align: left;
          `}
    line-height: 1.3;
    div.bubble-info-wrap {
      display: flex;
      ${({ party }) =>
        party === "BRIDE"
          ? css`
              flex-direction: row-reverse;
            `
          : css`
              flex-direction: row;
            `}

      p {
        white-space: pre-wrap;
        text-align: left;
        word-break: break-all;
        overflow-wrap: break-word;
        display: inline-block;
        padding: 8px 12px;
        margin: 4px 0 0 0;
        ${({ party }) =>
          party === "BRIDE"
            ? css`
                border-radius: 20px 4px 20px 20px;
                margin-left: 3px;
              `
            : css`
                border-radius: 4px 20px 20px 20px;
                margin-right: 3px;
              `}
        background: #eee;
        ${({ selected }) =>
          selected &&
          css`
            background: #ddd;
          `}
      }
      small {
        align-self: flex-end;
        flex-shrink: 0;
        color: #999;
        font-size: 11px;
      }
    }
    .edit {
      font-size: 0.9em;
      color: #999;
      text-decoration: underline;
    }
  }
`;

type TalkBubbleProps = {
  talk: Talk;
  selected: boolean;
  onBubbleClick: (id: string | undefined) => void;
  onEditClick: (id: string) => void;
};
const TalkBubble = ({
  talk,
  selected,
  onBubbleClick,
  onEditClick,
}: TalkBubbleProps) => {
  const handleBubbleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    onBubbleClick(talk.id);
  };
  const handleBubbleOutsideClick: MouseEventHandler = (e) =>
    onBubbleClick(undefined);
  const handleEditClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    onEditClick(talk.id);
  };
  const editBtn = (
    <span className="edit" onClick={handleEditClick}>
      수정하기
    </span>
  );
  return (
    <TalkBubbleWrap party={talk.party} color={talk.color} selected={selected}>
      {talk.party === "BRIDE" ? <EmojiLookLeft /> : <EmojiLookRight />}
      <div onClick={handleBubbleOutsideClick}>
        {selected && talk.party === "BRIDE" && <>{editBtn} </>}
        {talk.author}
        {selected && talk.party === "GROOM" && <> {editBtn}</>}
        <div className="bubble-info-wrap">
          <p onClick={handleBubbleClick}>{talk.msg}</p>
          <small>
            {!talk.published
              ? "검수중"
              : timeDiffFormat(new Date(talk.created))}
          </small>
        </div>
      </div>
    </TalkBubbleWrap>
  );
};

const ThankYou = styled.div`
  padding: 60px;
  color: #666;
`;

const Home = () => {
  const [writeDone, setWriteDone] = useSessionStorage("talk.writedone");
  const {
    data: talkListResp,
    error,
    mutate,
  } = useSWR<GetTalkListResponse>("/api/talk/list");

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showWriteTalkModal, setShowWriteTalkModal] = useState(false);
  const [showEditTalkModal, setShowEditTalkModal] = useState<Talk>();
  const [isWriteButtonShown, setWriteButtonShown] = useState(false);
  const [lastClickedGalleryItem, setLastClickedGalleryItem] =
    useState<number>();
  const [selectedTalkId, setSelectedTalkId] = useState<string>();

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

  const handlePhotoClick = (i: number) => {
    setLastClickedGalleryItem(i);
    setShowGalleryModal(true);
  };

  const handleGalleryModalClose = () => setShowGalleryModal(false);

  const handleTalkBubbleClick = (id: string | undefined) =>
    setSelectedTalkId(id);

  const handleWriteButtonClick = () => setShowWriteTalkModal(true);
  const handleWriteTalk = (_: string) => {
    setWriteDone("done");
    setShowWriteTalkModal(false);
    mutate();
  };
  const handleWriteTalkModalClose = () => setShowWriteTalkModal(false);

  const handleTalkEditClick = (id: string) => {
    const talk = talkListResp?.talks?.find((t) => t.id === id);
    if (!talk) return;
    setShowEditTalkModal(talk);
    setSelectedTalkId(undefined);
  };
  const handleEditTalk = (_: string) => {
    setWriteDone("done");
    setShowEditTalkModal(undefined);
    mutate();
  };
  const handleEditTalkModalClose = () => setShowEditTalkModal(undefined);

  return (
    <Main>
      <Header>
        이준영
        <hr />
        김민하
      </Header>
      <CoverPicWrap>
        <Image src={coverPic} priority={true} placeholder="blur" alt="" />
      </CoverPicWrap>
      <p>
        2022년 9월 25일 일요일 오후 3시
        <br />
        빌라드지디 청담
      </p>


      <SectionHr />

      <SectionHeader>아름다운 날. <br/>소중한 분을 초대합니다.</SectionHeader>
      <GreetingP>
        벚꽃엔딩이 온 거리에 울려 퍼지던 때
        <br />
        처음 만났습니다.
        <br />
        그리고, 함께했던 지난 10년은
        <br />
        더없이 행복했습니다.
        <br />
        <br />
        이제 그 행복을 더 가까이서
        <br />
        함께하려 합니다.
        <br />
        저희의 시작하는 모습을
        <br />
        여러분과 함께하고 싶습니다.
      </GreetingP>
      <GreetingP>
        김승수 · 황승미의 장녀 민하
        <br />
        (故)이상인 · 김혜숙의 장남 준영
      </GreetingP>
      <CallWrap>
        <a href="tel:01097650885">
          <CallButton
            icon={<EmojiLookRight />}
            bgColor="#abdaab"
            label="신랑측에 연락하기"
          />
        </a>
        <a href="tel:01062350221">
          <CallButton
            icon={<EmojiLookLeft />}
            bgColor="#c2e0a3"
            label="신부측에 연락하기"
          />
        </a>
      </CallWrap>
      <SectionHr />
      <PhotoGrid>
        {Array.from(Array(imageSize), (_, i) => i).map((i) => (
          <li key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              role="button"
              src={`/photos/p${i + 1}.jpeg`}
              onClick={() => handlePhotoClick(i)}
              loading="lazy"
              alt=""
            />
          </li>
        ))}
      </PhotoGrid>
      {showGalleryModal && (
        <Modal handleClose={handleGalleryModalClose}>
          <PhotoGallery
            initialSlide={lastClickedGalleryItem}
            onClose={handleGalleryModalClose}
          />
        </Modal>
      )}
      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Image src={mapPic} width="400px" height="270px" alt="" />
      <p>
        서울 강남구 학동로 519
        <br />
        빌라드지디 청담
      </p>
      <MapButton href="https://place.map.kakao.com/1417946142">
        <PinAlt color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href="https://naver.me/xM28SuGC">
        <PinAlt color="#66BB66" /> 네이버지도
      </MapButton>
      <SectionHr />
      <SectionHeader>💸 마음 전하실 곳</SectionHeader>
      <GiveWrap>
        <p>
          <strong>신랑측</strong>
          <br />
          <CopyText text="우리은행 1002-743-212772 (이준영)" />
          <br />
          <CopyText text="농협 453034-52-042891 (김혜숙)" />

        </p>
        <p>
          <strong>신부측</strong>
          <br />
          <CopyText text="하나은행 660-910948-39307 (김민하)" />
        </p>
      </GiveWrap>

      <SectionHr />

      <SectionHeader>👰 결혼식 이벤트</SectionHeader>
      <GreetingP>
        저희 부부가 결혼식에서 소소한 소개팅 이벤트를 준비했습니다.
        <br />
        매치그룹에 다니는 예비 신랑이 만든 알고리즘(?!)으로 이뤄지는
        <br />
        AI를 가장한 아날로그 소개팅! 많관부 🙈
        <br />

        <Button href="https://yearnning.typeform.com/to/XxHWkVSG">
          <Heart color="#E1AFAE" /> 신청하러 가기
        </Button>

      </GreetingP>

      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <WriteSectionSubHeader>
        <p>신랑측</p>
        <p>신부측</p>
      </WriteSectionSubHeader>
      <div style={{ clear: "both" }} />
      <TalkWrap>
        <WriteButtonTrigger ref={writeButtonTriggerRef} />
        {talkListResp?.talks.map((talk) => (
          <TalkBubble
            key={talk.id}
            talk={talk}
            selected={talk.id === selectedTalkId}
            onBubbleClick={handleTalkBubbleClick}
            onEditClick={handleTalkEditClick}
          />
        ))}
      </TalkWrap>
      <ThankYou>{writeDone ? "감사합니다." : ""}</ThankYou>
      {!writeDone && (
        <WriteButton
          visible={isWriteButtonShown}
          onClick={handleWriteButtonClick}
        >
          😍 나도 한마디
        </WriteButton>
      )}
      {showWriteTalkModal && (
        <Modal handleClose={handleWriteTalkModalClose}>
          <WriteTalk onWrite={handleWriteTalk} />
        </Modal>
      )}
      {showEditTalkModal && (
        <Modal handleClose={handleEditTalkModalClose}>
          <EditTalk talk={showEditTalkModal} onEdit={handleEditTalk} />
        </Modal>
      )}
    </Main>
  );
};

export default Home;
