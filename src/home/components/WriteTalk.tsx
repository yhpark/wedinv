import { EmojiBlinkLeft } from "iconoir-react";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { mutate } from "swr";
import { Party } from "../types";
import { BubbleHeadStyle, TextSansStyle } from "./index.styles";

const BubbleStyle = (party: Party) => css`
  ${TextSansStyle}
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

const BubbleWrap = styled.div<{ party: Party }>`
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
    ${({ party }) => BubbleHeadStyle(party)}
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

const NameInput = styled.div<{ party: Party }>`
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

const SubmitButton = styled.input<{ isValid: boolean }>`
  display: block;
  width: 90%;
  height: 44px;
  border-radius: 8px;
  border: 0;
  margin: 12px auto 0;

  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: rgb(255, 136, 170);
  outline: none;

  ${({ isValid }) =>
    isValid &&
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

type FormData = {
  author: string;
  party: Party;
  msg: string;
};

type Props = { onWrite: () => void };

const WriteTalk = ({ onWrite }: Props) => {
  const { register, handleSubmit, setValue, watch, formState } =
    useForm<FormData>();
  const { isValid, dirtyFields, errors } = formState;

  const errMsg = Object.values(errors).flatMap((e) =>
    e.message ? [e.message] : []
  )[0];

  const party = watch("party");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    register("author", {
      required: "이름을 입력해주세요.",
      maxLength: { value: 10, message: "이름이 너무 길어요." },
    });
    register("msg", {
      required: "내용을 입력해주세요.",
      minLength: { value: 5, message: "내용이 너무 짧아요 (최소 5자 이상)" },
      maxLength: { value: 100, message: "내용이 너무 길어요 (최대 100자)" },
    });
  }, []);

  const handleNameKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleNameInput: FormEventHandler<HTMLDivElement> = (e) => {
    setValue("author", e.currentTarget.textContent || "", {
      shouldValidate: true,
    });
  };

  const handleMsgInput: FormEventHandler<HTMLDivElement> = (e) =>
    setValue("msg", e.currentTarget.textContent || "", {
      shouldValidate: true,
    });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);

      await fetch("/api/talk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      mutate("/api/talk");
      onWrite();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <Header>
        😍 <span>나도 한마디</span>
      </Header>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        {dirtyFields["party"] && (
          <>
            <BubbleWrap party={party}>
              <EmojiBlinkLeft />
              <div>
                <NameInput
                  contentEditable
                  party={party}
                  onKeyDown={handleNameKeyDown}
                  onInput={handleNameInput}
                />
                <br />
                <MsgInput
                  contentEditable
                  party={party}
                  onInput={handleMsgInput}
                />
              </div>
            </BubbleWrap>
            <SubmitButton
              type="submit"
              value={(formState.isSubmitted && errMsg) || "글쓰기"}
              isValid={!isValid}
            />
          </>
        )}
      </form>
      {isLoading && <LoadingOverlay />}
    </Wrap>
  );
};

export default WriteTalk;
