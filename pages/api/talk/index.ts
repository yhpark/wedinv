import type { NextApiHandler } from "next";

import type { PostTalkRequest, PostTalkResponse } from "@/talk/types";
import { postTalk } from "@/talk/api";

const handlePost: NextApiHandler<PostTalkResponse> = async (req, res) => {
  const reqData: PostTalkRequest = req.body;

  const respData = await postTalk(reqData);

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return handlePost(req, res);
  }
  res.status(400);
};

export default handler;
