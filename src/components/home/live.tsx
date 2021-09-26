import styled from "styled-components";
import Link from "next/link";

import { Main } from "./styles";

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

const Live = () => {
  return (
    <Main>
      <Header>
        박영훈
        <hr />
        김현주
      </Header>

      <p>
        결혼식 생중계 준비중 입니다.
        <br />
        <Highlight>10/3 12시</Highlight>에 다시 방문해주세요 💕
      </p>
      <LinkWrap>
        <Link href="/">
          <a>모바일청첩장 보러가기</a>
        </Link>
      </LinkWrap>
    </Main>
  );
};

export default Live;
