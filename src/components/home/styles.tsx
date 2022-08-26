import styled, { css } from "styled-components";
import { Party } from "@/talk/types";

export const TextSerifStyle = css`
  font-family: "Noto Serif KR", serif;
`;
export const TextSansStyle = css`
  font-family: sans-serif;
`;

export const BoxShadowStyle = css`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const Main = styled.main`
  ${TextSerifStyle}

  max-width: 400px;
  margin: 0 auto;

  font-size: 14px;
  color: #333;
  text-align: center;
  line-height: 2.5;

  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    color: #333;
  }

  button {
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 20px;
    font-weight: 500;
  }

  strong {
    font-weight: 500;
  }
`;

export const SectionHr = styled.hr`
  width: 100px;
  margin: 60px auto;
  border: 0;
  border-top: 1px solid #ccc;
`;

export const SectionHeader = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

export const BubbleHeadStyle = (party: Party, color: string) => css`
  ${party === "BRIDE"
    ? css`
        float: right;
      `
    : css`
        float: left;
      `}
  background: ${color};
  width: 38px;
  height: 38px;
  color: white;
  padding: 8px;
  border-radius: 20px;
`;
