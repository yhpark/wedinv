import { EmojiLookLeft, EmojiLookRight } from "iconoir-react";
import React, {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import {
  CheckPasswordResponse,
  Party,
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
  const [isPasswordChecked, setPasswordChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const [party, setParty] = useState<Party>(talk.party);
  const [color, setColor] = useState(talk.color);
  const [author, setAuthor] = useState(talk.author);
  const [msg, setMsg] = useState(talk.msg);

  const [tempErrMsg, setTempErrMsg] = useState<string>();
  useEffect(() => {
    setTempErrMsg(undefined);
  }, [password]);

  const authorErrMsg =
    author.length === 0
      ? "이름을 입력해주세요."
      : author.length > 10
      ? "이름이 너무 길어요."
      : undefined;
  const msgErrMsg =
    msg.length === 0
      ? "내용을 입력해주세요."
      : msg.length < 5
      ? "내용이 너무 짧아요 (5자 이상)"
      : msg.length > 100
      ? "내용이 너무 길어요 (100자 이하)"
      : undefined;

  const errMsg = tempErrMsg ?? authorErrMsg ?? msgErrMsg;

  const handleHeadClick: MouseEventHandler<SVGElement> = (e) => {
    const nextColor =
      TalkHeadColors[
        (TalkHeadColors.indexOf(color) + 1) % TalkHeadColors.length
      ];
    setColor(nextColor);
  };

  const handleAuthorKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!isPasswordChecked) {
      try {
        setLoading(true);

        const queryPassword = encodeURIComponent(password);
        const resp = await fetch(
          `/api/talk/checkpw?id=${talk.id}&password=${queryPassword}`
        );
        const { check } = (await resp.json()) as CheckPasswordResponse;
        if (!check) {
          setTempErrMsg("암호가 맞지 않습니다.");
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

      const data: PatchTalkRequest = {
        id: talk.id,
        party,
        color,
        author,
        msg,
        password,
      };

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
      <form onSubmit={handleSubmit}>
        <Header>
          ✍️ <span>글 수정하기</span>
        </Header>
        {isPasswordChecked && (
          <>
            <PartyRow>
              <input
                type="radio"
                value="GROOM"
                id="groom"
                checked={party === "GROOM"}
                onChange={(e) => setParty(e.target.value as Party)}
              />
              <PartyLabel htmlFor="groom">🤵🏻‍♂️ 신랑측</PartyLabel>
              <input
                type="radio"
                value="BRIDE"
                id="bride"
                checked={party === "BRIDE"}
                onChange={(e) => setParty(e.target.value as Party)}
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
                  onKeyDown={handleAuthorKeyDown}
                  onInput={(e) => setAuthor(e.currentTarget.textContent || "")}
                >
                  {talk.author}
                </AuthorInput>
                <br />
                <MsgInput
                  contentEditable
                  party={party}
                  onInput={(e) => setMsg(e.currentTarget.textContent || "")}
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
              id="password"
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </PasswordWrap>
        )}
        {!isPasswordChecked ? (
          <SubmitButton type="submit" value={errMsg || "암호 확인"} isValid />
        ) : (
          <SubmitButton
            type="submit"
            value={errMsg || "수정하기"}
            isValid={!errMsg}
          />
        )}
      </form>
      {isLoading && <LoadingOverlay />}
    </Wrap>
  );
};

export default WriteTalk;
