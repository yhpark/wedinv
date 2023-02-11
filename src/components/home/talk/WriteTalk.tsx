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

import { Party, PostTalkRequest, PostTalkResponse } from "@/talk/types";
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

type WriteTalkProps = { onWrite: (id: string) => void };

const WriteTalk = ({ onWrite }: WriteTalkProps) => {
  const [isLoading, setLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const [party, setParty] = useState<Party>();
  const [color, setColor] = useState(
    TalkHeadColors[randomInt(0, TalkHeadColors.length - 1)]
  );
  const [author, setAuthor] = useState("");
  const [msg, setMsg] = useState("");
  const [showStep3, setShowStep3] = useState(false);
  const [password, setPassword] = useState("");

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
  const passwordErrMsg =
    password.length === 0
      ? "패스워드를 입력해주세요."
      : password.length < 4
      ? "패스워드가 너무 짧아요 (4자 이상)"
      : undefined;

  const step2ErrMsg = authorErrMsg ?? msgErrMsg;
  const step3ErrMsg = passwordErrMsg;

  useEffect(() => {
    setShowValidation(false);
  }, [author, msg, password]);

  const handleHeadClick: MouseEventHandler<SVGElement> = () => {
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

    if (step2) {
      if (step2ErrMsg) return;
      setShowStep3(true);
      return;
    }

    // step3
    if (!party) return;
    if (step3ErrMsg) return;
    try {
      setLoading(true);

      const data: PostTalkRequest = { party, color, author, msg, password };

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

  const step1 = !party;
  const step2 = party && !showStep3;
  const step3 = showStep3;

  const authorInputRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!step2) return;
    authorInputRef.current?.focus();
  }, [step2]);
  useEffect(() => {
    if (!step3) return;
    passwordInputRef.current?.focus();
  }, [step3]);

  return (
    <Wrap>
      <Header>
        😍 <span>나도 한마디</span>
      </Header>

      <form onSubmit={handleSubmit}>
        {(step1 || step2) && (
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
                  onKeyDown={handleAuthorKeyDown}
                  onInput={(e) => setAuthor(e.currentTarget.innerText)}
                />
                <br />
                <MsgInput
                  contentEditable
                  party={party}
                  onInput={(e) => setMsg(e.currentTarget.innerText)}
                />
              </div>
            </BubbleWrap>
          </>
        )}

        {step3 && (
          <PasswordWrap>
            <label htmlFor="password">작성하신 글의 암호를 입력해주세요.</label>
            <PasswordInput
              ref={passwordInputRef}
              id="password"
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </PasswordWrap>
        )}
        {step2 && (
          <SubmitButton
            type="submit"
            value={step2ErrMsg || "글쓰기"}
            isValid={!step2ErrMsg}
          />
        )}
        {step3 && (
          <SubmitButton
            type="submit"
            value={step3ErrMsg || "글쓰기"}
            isValid={!step3ErrMsg}
          />
        )}
      </form>
      {isLoading && <LoadingOverlay />}
    </Wrap>
  );
};

export default WriteTalk;
