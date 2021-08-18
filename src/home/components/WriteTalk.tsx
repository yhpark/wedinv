import useStorage from "@/common/hooks/useStorage";
import randomInt from "@/common/utils/randomInt";
import { EmojiLookLeft, EmojiLookRight } from "iconoir-react";
import {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled, { css } from "styled-components";

import { Party, PostTalkRequest, PostTalkResponse } from "../types";
import { BubbleHeadStyle, TextSansStyle } from "./styles";

const BubbleStyle = (party: Party) => css`
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

const Wrap = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 30px;
  margin: 0 20px;
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

const HighlightStyle = css`
  background: linear-gradient(
    0deg,
    transparent 33%,
    rgba(255, 136, 170, 0.3) 36%,
    rgba(255, 136, 170, 0.3) 66%,
    transparent 70%
  );
`;

const Header = styled.h3`
  margin-bottom: 20px;

  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 2;

  span {
    ${HighlightStyle}
  }
`;

const PartyRow = styled.div`
  display: flex;
  label:first-of-type {
    margin-right: 8px;
  }
`;

const PartyLabel = styled.label`
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

const BubbleWrap = styled.div<{ party: Party; color: string }>`
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

const AuthorInput = styled.div<{ party: Party }>`
  ${({ party }) => BubbleStyle(party)}
  display: inline-block;
  text-align: start;
  &:empty:before {
    content: "이름";
    color: grey;
  }
`;

const MsgInput = styled.div<{ party: Party }>`
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

const PasswordWrap = styled.div`
  text-align: center;
  marg label {
    color: #666;
  }
`;
const PasswordInput = styled.input`
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

const SubmitButton = styled.input<{ isValid: boolean }>`
  display: block;
  width: 90%;
  height: 44px;
  border-radius: 8px;
  border: 0;
  margin: 24px auto 0;

  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: rgb(255, 136, 170);
  outline: none;

  ${({ isValid }) =>
    !isValid &&
    css`
      background: rgb(255, 136, 170, 0.7);
    `}
`;

const LoadingOverlay = styled.div`
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

const TalkHeadColors = [
  "#ECC8F7",
  "#F7C8D3",
  "#e5d3b3",
  "#fed0b0",
  "#abdaab",
  "#c8d3f7",
];

type FormData = PostTalkRequest;

type Props = { onWrite: (id: string) => void };

const WriteTalk = ({ onWrite }: Props) => {
  const { register, handleSubmit, setValue, setFocus, watch, formState } =
    useForm<FormData>();
  const { isValid, dirtyFields, errors } = formState;

  const errMsg = Object.values(errors).flatMap((e) =>
    e.message ? [e.message] : []
  )[0];

  const party = watch("party");
  const color = watch("color");

  const [isLoading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [storedAuthor, setStoredAuthor] = useStorage("talk.write.cache.author");
  const [cachedAuthor] = useState(storedAuthor);
  const [storedMsg, setStoredMsg] = useStorage("talk.write.cache.msg");
  const [cachedMsg] = useState(storedMsg);

  useEffect(() => {
    register("author", {
      required: "이름을 입력해주세요.",
      maxLength: { value: 10, message: "이름이 너무 길어요." },
      value: cachedAuthor || "",
    });
    register("msg", {
      required: "내용을 입력해주세요.",
      minLength: { value: 5, message: "내용이 너무 짧아요 (5자 이상)" },
      maxLength: { value: 100, message: "내용이 너무 길어요 (100자 이하)" },
      value: cachedMsg || "",
    });
    register("color", {
      value: TalkHeadColors[randomInt(0, TalkHeadColors.length - 1)],
    });
  }, [register, cachedAuthor, cachedMsg]);

  const handleHeadClick: MouseEventHandler<SVGElement> = (e) => {
    const nextColor =
      TalkHeadColors[
        (TalkHeadColors.indexOf(color) + 1) % TalkHeadColors.length
      ];
    setValue("color", nextColor);
  };

  const handleNameKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleNameInput: FormEventHandler<HTMLDivElement> = (e) => {
    setValue("author", e.currentTarget.textContent || "", {
      shouldValidate: true,
    });
    setStoredAuthor(e.currentTarget.textContent || "");
  };

  const handleMsgInput: FormEventHandler<HTMLDivElement> = (e) => {
    setValue("msg", e.currentTarget.textContent || "", {
      shouldValidate: true,
    });
    setStoredMsg(e.currentTarget.textContent || "");
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.password) {
      setShowPasswordInput(true);
      return;
    }
    try {
      setLoading(true);

      const resp = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const { id } = (await resp.json()) as PostTalkResponse;

      onWrite(id);
    } finally {
      setLoading(false);
    }
  };

  const step1 = !dirtyFields["party"];
  const step2 = dirtyFields["party"] && !showPasswordInput;
  const step3 = showPasswordInput;

  const authorInputRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    authorInputRef.current?.focus();
  }, [step2]);
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, [step3]);

  return (
    <Wrap>
      <Header>
        😍 <span>나도 한마디</span>
      </Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        {(step1 || step2) && (
          <PartyRow>
            <input
              {...register("party", { required: true })}
              type="radio"
              value="BROOM"
              id="broom"
            />
            <PartyLabel htmlFor="broom">🤵🏻‍♂️ 신랑측</PartyLabel>
            <input
              {...register("party", { required: true })}
              type="radio"
              value="BRIDE"
              id="bride"
            />
            <PartyLabel htmlFor="bride">👰🏻‍♀️ 신부측</PartyLabel>
          </PartyRow>
        )}

        {step2 && (
          <>
            <BubbleWrap party={party} color={color}>
              {party === "BRIDE" ? (
                <EmojiLookLeft onClick={handleHeadClick} />
              ) : (
                <EmojiLookRight onClick={handleHeadClick} />
              )}
              <div>
                <AuthorInput
                  contentEditable
                  ref={authorInputRef}
                  party={party}
                  onKeyDown={handleNameKeyDown}
                  onInput={handleNameInput}
                >
                  {cachedAuthor || ""}
                </AuthorInput>
                <br />
                <MsgInput
                  contentEditable
                  party={party}
                  onInput={handleMsgInput}
                >
                  {cachedMsg || ""}
                </MsgInput>
              </div>
            </BubbleWrap>
          </>
        )}

        {step3 && (
          <PasswordWrap>
            <label htmlFor="password">작성하신 글의 암호를 입력해주세요.</label>
            <PasswordInput
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "암호가 너무 짧아요 (4자 이상)",
                },
              })}
              ref={passwordInputRef}
              id="password"
              type="password"
            />
          </PasswordWrap>
        )}
        {(step2 || step3) && (
          <SubmitButton
            type="submit"
            value={(formState.isSubmitted && errMsg) || "글쓰기"}
            isValid={isValid}
          />
        )}
      </form>
      {isLoading && <LoadingOverlay />}
    </Wrap>
  );
};

export default WriteTalk;
