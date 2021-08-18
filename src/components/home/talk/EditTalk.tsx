import { EmojiLookLeft, EmojiLookRight } from "iconoir-react";
import React, {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CheckPasswordResponse,
  PatchTalkRequest,
  PostTalkResponse,
  Talk,
} from "@/talk/types";
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

type FormData = PatchTalkRequest;

type Props = { talk: Talk; onEdit: (id: string) => void };

const WriteTalk = ({ talk, onEdit }: Props) => {
  const { register, handleSubmit, setValue, setError, watch, formState } =
    useForm<FormData>({
      defaultValues: {
        id: talk.id,
        author: talk.author,
        color: talk.color,
        party: talk.party,
        msg: talk.msg,
      },
    });
  const { isValid, dirtyFields, errors } = formState;

  const errMsg = Object.values(errors).flatMap((e) =>
    e.message ? [e.message] : []
  )[0];

  const party = watch("party");
  const color = watch("color");

  const [isPasswordChecked, setPasswordChecked] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    register("id");
    register("author", {
      required: "이름을 입력해주세요.",
      maxLength: { value: 10, message: "이름이 너무 길어요." },
    });
    register("msg", {
      required: "내용을 입력해주세요.",
      minLength: { value: 5, message: "내용이 너무 짧아요 (5자 이상)" },
      maxLength: { value: 100, message: "내용이 너무 길어요 (100자 이하)" },
    });
    register("color");
  }, [register, talk]);

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
  };

  const handleMsgInput: FormEventHandler<HTMLDivElement> = (e) => {
    setValue("msg", e.currentTarget.textContent || "", {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isPasswordChecked) {
      try {
        setLoading(true);

        const queryPassword = encodeURIComponent(data.password);
        const resp = await fetch(
          `/api/talk/checkpw?id=${talk.id}&password=${queryPassword}`
        );
        const { check } = (await resp.json()) as CheckPasswordResponse;
        if (!check) {
          setError("password", { message: "암호가 맞지 않습니다." });
          return;
        }

        setPasswordChecked(true);
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      setLoading(true);

      const resp = await fetch("/api/talk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      (await resp.json()) as PostTalkResponse;

      onEdit(talk.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          ✍️ <span>글 수정하기</span>
        </Header>
        {isPasswordChecked && (
          <>
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
            <BubbleWrap party={party} color={color}>
              {party === "BRIDE" ? (
                <EmojiLookLeft onClick={handleHeadClick} />
              ) : (
                <EmojiLookRight onClick={handleHeadClick} />
              )}
              <div>
                <AuthorInput
                  contentEditable
                  party={party}
                  onKeyDown={handleNameKeyDown}
                  onInput={handleNameInput}
                >
                  {talk.author}
                </AuthorInput>
                <br />
                <MsgInput
                  contentEditable
                  party={party}
                  onInput={handleMsgInput}
                >
                  {talk.msg}
                </MsgInput>
              </div>
            </BubbleWrap>
          </>
        )}

        {!isPasswordChecked && (
          <PasswordWrap>
            <label htmlFor="password">작성하신 글의 암호를 입력해주세요.</label>
            <PasswordInput
              {...register("password", { required: true })}
              id="password"
              type="password"
            />
          </PasswordWrap>
        )}
        <SubmitButton
          type="submit"
          value={
            (formState.isSubmitted && errMsg) ||
            (isPasswordChecked ? "수정하기" : "암호 확인")
          }
          isValid={isValid || !isPasswordChecked}
        />
      </form>
      {isLoading && <LoadingOverlay />}
    </Wrap>
  );
};

export default WriteTalk;
