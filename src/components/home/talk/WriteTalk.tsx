import { useSessionStorage } from "@/common/hooks/useStorage";
import randomInt from "@/common/utils/randomInt";
import { EmojiLookLeft, EmojiLookRight } from "iconoir-react";
import React, {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { PostTalkRequest, PostTalkResponse } from "@/talk/types";
import {
  AuthorInput,
  BubbleWrap,
  Header,
  LoadingOverlay,
  MsgInput,
  PartyLabel,
  PartyRow,
  PasswordInput,
  PasswordWrap,
  SubmitButton,
  TalkHeadColors,
  Wrap,
} from "./styles";

type FormData = PostTalkRequest;

type Props = { onWrite: (id: string) => void };

const WriteTalk = ({ onWrite }: Props) => {
  const { register, handleSubmit, setValue, watch, formState } =
    useForm<FormData>();
  const { isValid, dirtyFields, errors } = formState;

  const errMsg = Object.values(errors).flatMap((e) =>
    e.message ? [e.message] : []
  )[0];

  const party = watch("party");
  const color = watch("color");

  const [isLoading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [storedAuthor, setStoredAuthor] =
    useSessionStorage("talk.write.author");
  const [cachedAuthor] = useState(storedAuthor);
  const [storedMsg, setStoredMsg] = useSessionStorage("talk.write.msg");
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

      setStoredAuthor("");
      setStoredMsg("");
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
              value="GROOM"
              id="groom"
            />
            <PartyLabel htmlFor="groom">🤵🏻‍♂️ 신랑측</PartyLabel>
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
