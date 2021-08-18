import { NextApiHandler } from "next";

import { CheckPasswordResponse } from "@/talk/types";
import { checkPassword } from "@/talk/api";

const handleGet: NextApiHandler<CheckPasswordResponse> = async (req, res) => {
  const id = req.query["id"] as string;
  const password = req.query["password"] as string;

  const respData = await checkPassword(id, password);

  res.status(200).json(respData);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
  res.status(400);
};

export default handler;
