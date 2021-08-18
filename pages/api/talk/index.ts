import type { NextApiHandler } from "next";

import type { PatchTalkRequest, PatchTalkResponse, PostTalkRequest, PostTalkResponse } from "@/talk/types";
import { patchTalk, postTalk } from "@/talk/api";

const handlePost: NextApiHandler<PostTalkResponse> = async (req, res) => {
  const reqData: PostTalkRequest = req.body;

  const respData = await postTalk(reqData);

  res.status(200).json(respData);
};

const handlePatch: NextApiHandler<PatchTalkResponse> = async (req, res) => {
  const reqData: PatchTalkRequest = req.body;

  const respData = await patchTalk(reqData);

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "PATCH") {
    return handlePatch(req, res);
  }
  res.status(404).end();
};

export default handler;
