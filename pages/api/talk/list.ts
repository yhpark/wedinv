import { NextApiHandler } from "next";

import { getTalkList } from "@/talk/api";
import type { GetTalkListResponse } from "@/talk/types";

const handleGet: NextApiHandler<GetTalkListResponse> = async (req, res) => {
  const myId = req.query["myId"] as string;

  const respData = await getTalkList(myId);

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
  res.status(404).end();
};

export default handler;
