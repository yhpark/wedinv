import crypto from "crypto";
import { promisify } from "util";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import {
  CheckPasswordResponse,
  GetTalkListResponse,
  Party,
  PatchTalkRequest,
  PatchTalkResponse,
  PostTalkRequest,
  PostTalkResponse,
  Talk,
} from "@/talk/types";

const scrypt = promisify(crypto.scrypt);

type SheetTalk = Talk & { password: string };

const SHEET_TALK_HEADER: (keyof SheetTalk)[] = [
  "id",
  "author",
  "party",
  "msg",
  "created",
  "password",
  "published",
];

let sheet: GoogleSpreadsheetWorksheet | undefined = undefined;
const getSheet = async () => {
  if (!sheet) {
    const doc = new GoogleSpreadsheet(process.env.GUESTBOOK_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      private_key: process.env.GOOGLE_PRIVATE_KEY as string,
    });
    await doc.loadInfo();
    sheet = doc.sheetsByIndex[0];

    // set header row
    await sheet.loadHeaderRow();
    if (sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(SHEET_TALK_HEADER);
    }
  }
  return sheet;
};

const deserializeTalk = (r: GoogleSpreadsheetRow) => {
  const talk: SheetTalk = {
    id: r.id as string,
    author: r.author as string,
    color: r.color as string,
    party: r.party as Party,
    msg: r.msg as string,
    created: new Date(r.created + " GMT+0900").getTime(),
    password: r.password,
    published: r.published === "TRUE",
  };
  return talk;
};

const serializeTalk = (talk: SheetTalk) => {
  return {
    ...talk,
    created: new Date(talk.created)
      .toLocaleString("en", { timeZone: "Asia/Seoul" })
      .replace(/,/g, ""),
  };
};

const hashPasword = async (password: string) =>
  ((await scrypt(password, "D7zboYc4Uc", 16)) as Buffer).toString("hex");

export const COOKIE_TALK_ID = "talkId";

export const getTalkList = async (talkId: string) => {
  const sheet = await getSheet();

  const rows = await sheet.getRows();
  const allTalks = rows.map(deserializeTalk);
  allTalks.sort((a, b) => b.created - a.created);

  const visibleTalks = allTalks.filter((t) => t.published || t.id === talkId);

  const respData: GetTalkListResponse = { talks: visibleTalks };
  return respData;
};

export const postTalk = async (reqData: PostTalkRequest) => {
  const created = Date.now();

  const newTalk: SheetTalk = {
    ...reqData,
    id: created.toString(),
    created: created,
    password: await hashPasword(reqData.password),
    published: false,
  };

  const sheet = await getSheet();
  await sheet.addRow(serializeTalk(newTalk));

  const respData: PostTalkResponse = { id: newTalk.id };
  return respData;
};

export const patchTalk = async (reqData: PatchTalkRequest) => {
  const sheet = await getSheet();

  const rows = await sheet.getRows();

  const hashedPassword = await hashPasword(reqData.password);
  const row = rows.find(
    (r) => r.id === reqData.id && r.password === hashedPassword
  );
  if (!row) {
    const respData: PatchTalkResponse = {
      error: "수정할 글이 없거나 암호가 틀립니다.",
    };
    return respData;
  }

  row.author = reqData.author;
  row.color = reqData.color;
  row.party = reqData.party;
  row.msg = reqData.msg;
  row.published = false;
  await row.save();

  const respData: PatchTalkResponse = {};
  return respData;
};

export const checkPassword = async (id: string, password: string) => {
  const sheet = await getSheet();

  const rows = await sheet.getRows();

  const hashedPassword = await hashPasword(password);
  const row = rows.find((r) => r.id === id && r.password === hashedPassword);

  const respData: CheckPasswordResponse = { check: !!row };
  return respData;
};
