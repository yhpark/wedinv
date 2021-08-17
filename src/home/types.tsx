export type Party = "BRIDE" | "GROOM";

export type Talk = {
  id: string;
  author: string;
  party: Party;
  msg: string;
  created: number;
  published: boolean;
};

export type PostTalkRequest = { author: string; party: Party; msg: string };
export type PostTalkResponse = { id: string };

export type GetTalkResponse = { talks: Talk[] };
