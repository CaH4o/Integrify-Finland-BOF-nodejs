import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { IUser } from "../types/tUser";
import { eError } from "../types/tError";

const fileName: string = "../data/user.json";

export function getDataUsers(): IUser[] | eError {
  let data: IUser[] = [];
  try {
    data = JSON.parse(
      readFileSync(join(__dirname, fileName), { encoding: "utf8" })
    );
    return data
  } catch (err) {
    console.log(err);
    return eError.server503;
  }
}

export function setDataUsers(users: IUser[]): IUser[] | eError {
  try {
    writeFileSync(join(__dirname, fileName), JSON.stringify(users), {
      flag: "w",
      encoding: "utf-8",
    });
    return users;
  } catch (err) {
    console.error(err);
    return eError.server503;
  }
}
