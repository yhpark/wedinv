export type Party = "BRIDE" | "GROOM";

export type Chat = {
  author: string;
  party: Party;
  msg: string;
  created: Date;
};
