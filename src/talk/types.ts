export type Party = "BRIDE" | "GROOM";

export type Talk = {
  id: string;
  author: string;
  color: string;
  party: Party;
  msg: string;
  created: number;
  published: boolean;
};

export type GetTalkListResponse = { talks: Talk[] };

export type PostTalkRequest = {
  author: string;
  color: string;
  party: Party;
  msg: string;
  password: string;
};
export type PostTalkResponse = { id: string };

export type CheckPasswordResponse = { check: boolean };

export type PatchTalkRequest = {
  id: string;
  author: string;
  color: string;
  party: Party;
  msg: string;
  password: string;
};
export type PatchTalkResponse = { error?: string };

export type DeleteTalkRequest = {
  /* TODO */
};
