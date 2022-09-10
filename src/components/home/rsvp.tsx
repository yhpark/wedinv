import styled, { css } from "styled-components";
import Link from "next/link";

import { Main } from "./styles";

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


import { PostRsvpRequest, PostRsvpResponse } from "@/rsvp/types";
import { SubmitHandler, useForm } from "react-hook-form";

const Rsvp = () => {
  type FormData = PostRsvpRequest;
  const { register, handleSubmit, setValue, watch, formState } = useForm<FormData>();
  const { isValid, dirtyFields, errors } = formState;
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const onSubmit = async (data: FormData, msg: string) => {
    try {
      setLoading(true);

      data.msg = msg;
      data.id = window.location.search.substring(1);

      const resp = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const { id } = (await resp.json());
      setCompleted(true);

    } finally {
      setLoading(false);
    }
  };

  const onYesSubmit: SubmitHandler<FormData> = async (data) => {
    onSubmit(data, "yes");
  };

  const onNoSubmit: SubmitHandler<FormData> = async (data) => {
    onSubmit(data, "no");
  };

  const onIdkSubmit: SubmitHandler<FormData> = async (data) => {
    onSubmit(data, "idk");
  };

  if (isCompleted) {
    return (
      <Main>
        <Header>
          김민하  ♡ 이준영
          <hr />
          <small>결혼식 식사 여부 전달완료</small>
        </Header>

        <EventP>
          응답해주셔서 감사합니다 💕
          <br/>
          혹시 잘못 누르셨거나
          <br/>
          다른 문의사항 있으시면
          <br/>
          언제든 저희 부부에게 연락주세요 😊
        </EventP>

        <LinkWrap>
          <u><Link href="/">
            <a>모바일청첩장 보러가기</a>
          </Link></u>
        </LinkWrap>
      </Main>
    );
  } else {
    return (
      <Main>
        <Header>
          김민하  ♡ 이준영
          <hr />
          <small>결혼식 식사 여부 전달하기</small>
        </Header>

        <EventP>
          가족들과 시간을 맞추다보니 부득이하게 식을
          <br/>
          <Highlight>일요일 오후 3시</Highlight>에 진행하게 되었습니다.
          <br />
          특별한 날 축하의 의미로 참석해주시는 모든 분들을
          <br />
          한분 한분 더 귀하게 모실 수 있도록,
          <br/>
          간단히 아래 버튼을 눌러
          <br />
          식사 여부를 전달해주시면 감사하겠습니다. 💕
        </EventP>

        <Wrap>
          <form onSubmit={handleSubmit(onYesSubmit)}>
            <RsvpButton type="submit" value="식사합니다" kind="yes" />
          </form>

          <form onSubmit={handleSubmit(onNoSubmit)}>
            <RsvpButton type="submit" value="식사하지 않습니다" kind="no" />
          </form>
          <form onSubmit={handleSubmit(onIdkSubmit)}>
            <RsvpButton type="submit" value="아직 모르겠어요" kind="idk"/>
          </form>
          {isLoading && <LoadingOverlay />}
        </Wrap>
      </Main>
    );
  }
};

export default Rsvp;
