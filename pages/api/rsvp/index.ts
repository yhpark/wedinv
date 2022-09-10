import type { NextApiHandler } from "next";

import type { PostRsvpRequest, PostRsvpResponse } from "@/rsvp/types";
import { COOKIE_TALK_ID, postRsvp } from "@/rsvp/api";
import { setCookie } from "@/common/utils/cookie";

const handlePost: NextApiHandler<PostRsvpResponse> = async (req, res) => {
  const reqData: PostRsvpRequest = req.body;

  const respData = await postRsvp(reqData);

  setCookie(res, COOKIE_TALK_ID, respData.id, {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return handlePost(req, res);
  }
  res.status(404).end();
};

export default handler;
