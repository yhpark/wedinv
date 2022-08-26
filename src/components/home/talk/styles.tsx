import styled, { css } from "styled-components";

import { BubbleHeadStyle, TextSansStyle } from "../styles";
import { Party } from "@/talk/types";

export const BubbleStyle = (party: Party) => css`
  ${TextSansStyle}
  white-space: pre-wrap;
  display: inline-block;
  padding: 10px 16px;
  border: none;
  line-height: 1.3;
  ${party === "BRIDE"
    ? css`
        border-radius: 20px 4px 20px 20px;
      `
    : css`
        border-radius: 4px 20px 20px 20px;
      `}
  background: #eee;
  outline: none;
  &:focus {
    background: #ddd;
  }
  &:not(:first-child) {
    margin: 6px 0 0 0;
  }
`;

export const Wrap = styled.div`
  position: relative;
  width: calc(100% - 40px);
  max-width: 400px;
  padding: 20px;
  border-radius: 30px;
  margin: 0 auto;
  overflow: hidden;

  background: white;
  text-align: start;
  ${TextSansStyle}

  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }

  input,
  label,
  div[contenteditable="true"] {
    appearance: none;
    transition: 0.3s;
  }
`;

export const HighlightStyle = css`
  background: linear-gradient(
    0deg,
    transparent 33%,
    rgba(255, 136, 170, 0.3) 36%,
    rgba(255, 136, 170, 0.3) 66%,
    transparent 70%
  );
`;

export const Header = styled.h3`
  margin-bottom: 20px;

  text-align: center;
  font-size: 18px;
  font-weight: 900;
  line-height: 2;

  span {
    ${HighlightStyle}
  }
`;

export const PartyRow = styled.div`
  display: flex;
  label:first-of-type {
    margin-right: 8px;
  }
`;

export const PartyLabel = styled.label`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 1px solid rgb(255, 136, 170);
  color: rgb(255, 136, 170);

  text-align: center;
  font-size: 16px;

  input[type="radio"]:checked + & {
    color: white;
    background: rgb(255, 136, 170);
  }
`;

export const BubbleWrap = styled.div<{ party: Party; color: string }>`
  margin: 24px 0;
  ${({ party }) =>
    party === "BRIDE"
      ? css`
          text-align: right;
        `
      : css`
          text-align: left;
        `}
  svg {
    ${({ party, color }) => BubbleHeadStyle(party, color)}
  }
  > div {
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
  }
`;

export const AuthorInput = styled.div<{ party: Party }>`
  ${({ party }) => BubbleStyle(party)}
  display: inline-block;
  text-align: start;
  &:empty:before {
    content: "이름";
    color: grey;
  }
`;

export const MsgInput = styled.div<{ party: Party }>`
  ${({ party }) => BubbleStyle(party)}
  word-break: break-all;
  overflow-wrap: break-word;
  display: inline-block;
  text-align: start;
  &:empty:before {
    content: "내용을 입력해주세요.";
    color: grey;
  }
`;

export const PasswordWrap = styled.div`
  text-align: center;
  label {
    display: block;
  }
`;
export const PasswordInput = styled.input`
  padding: 12px 0;
  border-radius: 8px;
  border: 1px solid rgb(255, 136, 170);
  margin-top: 4px;

  background: rgb(255, 136, 170, 0.1);
  text-align: center;
  outline: none;
  color: rgb(255, 136, 170);

  &:focus {
    background: white;
  }
`;

export const SubmitButton = styled.input<{ isValid: boolean }>`
  display: block;
  width: 90%;
  height: 44px;
  border-radius: 8px;
  border: 0;
  margin: 24px auto 0;

  text-align: center;
  font-size: 16px;
  font-weight: 900;
  color: white;
  background: rgb(255, 136, 170);
  outline: none;

  ${({ isValid }) =>
    !isValid &&
    css`
      background: rgb(255, 136, 170, 0.7);
    `}
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.25);
`;

export const TalkHeadColors = [
  "#ECC8F7",
  "#F7C8D3",
  "#e5d3b3",
  "#fed0b0",
  "#abdaab",
  "#c8d3f7",
];
