import styled, { css } from "styled-components";
import Link from "next/link";

import { Main } from "./styles";

import queryString from 'query-string';

import React, {
  useState,
} from "react";

import {
  BoxShadowStyle,
  BubbleHeadStyle,
  SectionHeader,
  SectionHr,
  TextSansStyle,
  EventP,
} from "./styles";

import {
  LoadingOverlay,
  Wrap,
} from "./talk/styles";

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

  small {
    font-size: 15px;
  }
`;

const LinkWrap = styled.p`
  a:link,
  a:visited,
  a:hover {
    text-decoration: underline;
  }
`;

export const Highlight = styled.span`
  background: linear-gradient(
    0deg,
    transparent 33%,
    rgba(255, 136, 170, 0.2) 36%,
    rgba(255, 136, 170, 0.2) 60%,
    transparent 70%
  );
`;

export const RsvpButton = styled.input<{ kind: string }>`
  display: block;
  width: 90%;
  height: 44px;
  border-radius: 8px;
  border: 0;
  margin: 4px auto 0;

  text-align: center;
  font-size: 16px;
  font-weight: 900;
  color: white;
  outline: none;

  ${({ kind }) => {
    if (kind == "yes") {
      return css`
        background: #B5D9AF;
      `
    } else if (kind == 'no') {
      return css`
        background: #F0CAD3;
      `
    } else {
      return css`
        background: #F7D2B4;
      `
    }
  }
}`;

import { useRouter } from 'next/router'


const Meeting = () => {

  const router = useRouter()
  const userId = router.query.id as string

  let name = "";
  let oppositeName = "";
  let oppositeDrink = "";
  let oppositeNumber = "";

  if (userId == 'iT') { name = '권연진'; oppositeName = '임진택'; oppositeNumber = '010-4736-8940'; oppositeDrink = '맥주'; }
  else if (userId == 'ZM') { name = '천수빈'; oppositeName = '이용선'; oppositeNumber = '010-5580-9450'; oppositeDrink = '제로콜라, 위스키, 디카페인 커피, 루이보스, 밀크티'; }
  else if (userId == 'CB') { name = '최아름'; oppositeName = '김병수'; oppositeNumber = '010-3627-8637'; oppositeDrink = '아이스 아메리카노'; }
  else if (userId == 'WA') { name = '안영주'; oppositeName = '이태헌'; oppositeNumber = '010-7237-7849'; oppositeDrink = '콜라'; }
  else if (userId == 'To') { name = '황윤정'; oppositeName = '원대영'; oppositeNumber = '010-4112-7936'; oppositeDrink = '바닐라맛 느껴지는 차'; }
  else if (userId == 'jX') { name = '한지현'; oppositeName = '김건욱'; oppositeNumber = '010-7558-2998'; oppositeDrink = '샷 추가한 토피넛라떼'; }
  else if (userId == 'qY') { name = '이다솜'; oppositeName = '김민찬'; oppositeNumber = '010-5302-1459'; oppositeDrink = '아이스 아메리카노'; }
  else if (userId == 'ib') { name = '최예슬'; oppositeName = '권지훈'; oppositeNumber = '010-4333-0875'; oppositeDrink = '포카리스웨트'; }
  else if (userId == 'Js') { name = '제나영'; oppositeName = '윤기수'; oppositeNumber = '010-6361-0890'; oppositeDrink = '버블 밀크티'; }
  else if (userId == 'ze') { name = '신지원'; oppositeName = '정인교'; oppositeNumber = '010-7542-8588'; oppositeDrink = '제로콜라 펩시'; }
  else if (userId == 'iP') { name = '김서진'; oppositeName = '정진욱'; oppositeNumber = '010-8948-2564'; oppositeDrink = '아메리카노'; }
  else if (userId == 'BG') { name = '강민주'; oppositeName = '이시나'; oppositeNumber = '010-4112-6208'; oppositeDrink = '밀크티, 자바칩 프라푸치노, 아이스와인'; }
  else if (userId == 'qX') { name = '한예진'; oppositeName = '박성호'; oppositeNumber = '010-9102-4861'; oppositeDrink = '시원한 녹차'; }
  else if (userId == 'jO') { name = '서주희'; oppositeName = '김종현'; oppositeNumber = '010-8259-7577'; oppositeDrink = '아이스헤이즐넛아메리카노, 소주, 위스키'; }
  else if (userId == 'El') { name = '김단희'; oppositeName = '이일규'; oppositeNumber = '010-3213-2193'; oppositeDrink = '아메리카노, 소주'; }
  else if (userId == 'Pd') { name = '고혜원'; oppositeName = '최병혁'; oppositeNumber = '010-6373-9496'; oppositeDrink = '차가운 커피, 우유가 들어간 커피'; }
  else if (userId == 'Sb') { name = '박지수'; oppositeName = '이재영'; oppositeNumber = '010-5540-9195'; oppositeDrink = '아메리카노'; }
  else if (userId == 'oD') { name = '장동한'; oppositeName = '김재헌'; oppositeNumber = '010-3162-4073'; oppositeDrink = '아이스바닐라라떼, 칵테일'; }
  else if (userId == 'Zr') { name = '임진택'; oppositeName = '권연진'; oppositeNumber = '010-8711-4493'; oppositeDrink = '아이스돌체콜드브루'; }
  else if (userId == 'YO') { name = '이용선'; oppositeName = '천수빈'; oppositeNumber = '010-3958-3532'; oppositeDrink = '화이트 와인, 맥주, 바닐라라떼'; }
  else if (userId == 'aR') { name = '김병수'; oppositeName = '최아름'; oppositeNumber = '010-3885-3323'; oppositeDrink = '맥주, 아이스 아메리카노'; }
  else if (userId == 'XX') { name = '이태헌'; oppositeName = '안영주'; oppositeNumber = '010-2553-8072'; oppositeDrink = '와인'; }
  else if (userId == 'jt') { name = '원대영'; oppositeName = '황윤정'; oppositeNumber = '010-4578-0394'; oppositeDrink = '아이스 아메리카노'; }
  else if (userId == 'dP') { name = '김건욱'; oppositeName = '한지현'; oppositeNumber = '010-2045-3061'; oppositeDrink = '아메리카노, 소주, 맥주'; }
  else if (userId == 'Rr') { name = '김민찬'; oppositeName = '이다솜'; oppositeNumber = '010-8575-0885'; oppositeDrink = '아이스 아메리카노'; }
  else if (userId == 'mj') { name = '권지훈'; oppositeName = '최예슬'; oppositeNumber = '010-4121-8901'; oppositeDrink = '아메리카노'; }
  else if (userId == 'NG') { name = '윤기수'; oppositeName = '제나영'; oppositeNumber = '010-4110-2827'; oppositeDrink = '소맥'; }
  else if (userId == 'LM') { name = '정인교'; oppositeName = '신지원'; oppositeNumber = '010-4517-4389'; oppositeDrink = '카페라떼'; }
  else if (userId == 'Nr') { name = '정진욱'; oppositeName = '김서진'; oppositeNumber = '010-8348-9505'; oppositeDrink = '아아, 소맥, 위스키'; }
  else if (userId == 'gX') { name = '이시나'; oppositeName = '강민주'; oppositeNumber = '010-8886-9603'; oppositeDrink = '콜드브루'; }
  else if (userId == 'eg') { name = '박성호'; oppositeName = '한예진'; oppositeNumber = '010-3253-3115'; oppositeDrink = '아아, 와인'; }
  else if (userId == 'BZ') { name = '김종현'; oppositeName = '서주희'; oppositeNumber = '010-2168-0388'; oppositeDrink = '아메리카노, 카페라떼, 바닐라라떼, 자몽허니블랙티'; }
  else if (userId == 'BU') { name = '이일규'; oppositeName = '김단희'; oppositeNumber = '010-8615-6718'; oppositeDrink = '아메리카노, 맥주'; }
  else if (userId == 'Ip') { name = '최병혁'; oppositeName = '고혜원'; oppositeNumber = '010-3780-0715'; oppositeDrink = '아이스 아메리카노, 소주, 위스키'; }
  else if (userId == 'Dk') { name = '이재영'; oppositeName = '박지수'; oppositeNumber = '010-4727-6236'; oppositeDrink = '아이스 아메리카노, 맥주'; }
  else if (userId == 'yn') { name = '김재헌'; oppositeName = '장동한'; oppositeNumber = '010-6505-0481'; oppositeDrink = '수박주스'; }
  else if (userId == 'MH') { name = '김민하'; oppositeName = '이준영'; oppositeNumber = '010-9765-0885'; oppositeDrink = '아이스 아메리카노, 위스키'; }
  else {
    return (
      <Main>
        <Header>
        김민하  ♡ 이준영
        <hr />
        <small>결혼식 소개팅 이벤트</small>
        </Header>

        <EventP>
          잘못된 페이지입니다.
        </EventP>
      </Main>
    )
  }

  var curr = new Date();
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;  //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
  const today = new Date(utc + (KR_TIME_DIFF));

  if (today.getFullYear() >= 2022 && (today.getMonth() + 1) >= 9 && today.getDate() >= 25 && today.getHours() >= 15) {
    return (
      <Main>
        <Header>
        김민하  ♡ 이준영
        <hr />
        <small>결혼식 소개팅 이벤트</small>
        </Header>

        <EventP>
          {name}님, 안녕하세요.
          <br />
          <br/>
          당신의 매칭 상대는 {oppositeName}님입니다.
          <br />
          전화번호는 {oppositeNumber} 입니다.
          <br />
          <br />
          {oppositeName}님은 이런 것들을 좋아하신대요🙈
          <br />
          {oppositeDrink}
          <br />
          <br />
          그럼, 즐거운 시간 되세요 💕
        </EventP>
      </Main>
    );
  } else {
    return (
      <Main>
        <Header>
        김민하  ♡ 이준영
        <hr />
        <small>결혼식 소개팅 이벤트</small>
        </Header>

        <EventP>
          {name}님, 안녕하세요.
          <br/>
          저희 부부가 운영하는 소개팅 이벤트에
          <br/>
          참여해주셔서 감사합니다.
          <br/>
          <br />
          매칭된 상대의 연락처는 이 페이지에서
          <br/>
          9월 25일 오후 3시 이후에
          <br/>
          확인하실 수 있습니다.
          <br />
          9월 25일 3시 이후에 다시 방문 부탁드립니다!
          <br/>
          <br />
          꼭 상대방과 술집 혹은 카페를 방문해주세요 🙈
          <br />
          여러분들의 설렘과 기쁨이
          <br />
          저희 부부의 행복입니다.
          <br />
          <br/>
          그럼, 두근두근한 소개팅 되세요 💕
        </EventP>
      </Main>
    )

  }
};

export default Meeting;
