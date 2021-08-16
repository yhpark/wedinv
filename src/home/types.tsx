export type Party = "BRIDE" | "GROOM";

export type Talk = {
  author: string;
  party: Party;
  msg: string;
  created: Date;
};

export type PostTalkRequest = { author: string; party: Party; msg: string };

export type GetTalkResponse = { talks: Talk[] };
