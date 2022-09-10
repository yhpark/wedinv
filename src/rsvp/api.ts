import crypto from "crypto";
import { promisify } from "util";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import {
  PostRsvpRequest,
  PostRsvpResponse,
} from "@/rsvp/types";

const scrypt = promisify(crypto.scrypt);

let sheet: GoogleSpreadsheetWorksheet | undefined = undefined;
const getSheet = async () => {
  if (!sheet) {
    const doc = new GoogleSpreadsheet(process.env.GUESTBOOK_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      private_key: process.env.GOOGLE_PRIVATE_KEY as string,
    });
    await doc.loadInfo();
    sheet = doc.sheetsByIndex[1];
  }
  return sheet;
};


const serializeRsvp = (rsvp) => {
  return {
    ...rsvp,
    created: new Date(rsvp.created)
      .toLocaleString("en", { timeZone: "Asia/Seoul" })
      .replace(/,/g, ""),
  };
};

export const postRsvp = async (reqData: PostRsvpRequest) => {
  const created = Date.now();

  const newRsvp = {
    ...reqData,
    created: created,
  };

  const sheet = await getSheet();

  await sheet.addRow(serializeRsvp(newRsvp));

  const respData: PostRsvpResponse = { id: newRsvp.id };
  return respData;
};
