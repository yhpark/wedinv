import { GetTalkResponse, PostTalkRequest, Talk } from "@/home/types";
import type { NextApiRequest, NextApiResponse } from "next";

let talks: Talk[] = [
  {
    author: "이준영",
    party: "BRIDE",
    msg: "축하해!!!",
    created: new Date(),
  },
  {
    author: "이준영",
    party: "GROOM",
    msg: "호어엉이!!",
    created: new Date(),
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const reqData: PostTalkRequest = req.body;
    const newTalk = { ...reqData, created: new Date() };
    talks = [...talks, newTalk];
    talks.sort((a, b) => b.created.getTime() - a.created.getTime());
    return res.status(200).json({});
  }

  const respData: GetTalkResponse = { talks };
  res.status(200).json(respData);
};
