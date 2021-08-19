import { NextApiHandler } from "next";

import { COOKIE_TALK_ID, getTalkList } from "@/talk/api";
import type { GetTalkListResponse } from "@/talk/types";

const handleGet: NextApiHandler<GetTalkListResponse> = async (req, res) => {
  const talkId = req.cookies[COOKIE_TALK_ID];

  const respData = await getTalkList(talkId);

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
  res.status(404).end();
};

export default handler;
