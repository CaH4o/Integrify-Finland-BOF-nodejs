import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { IUser } from "../types/tUser";

const fileName: string = "../data/user.json";

export function getDataUsers(): IUser[] {
  let data: IUser[] = [];
  try {
    data = JSON.parse(
      readFileSync(join(__dirname, fileName), { encoding: "utf8" })
    );
  } catch (err) {
    console.log(err);
  }

  return data;
}

export function setDataUsers(users: IUser[]): boolean {
  try {
    writeFileSync(join(__dirname, fileName), JSON.stringify(users), {
      flag: "w",
      encoding: "utf-8",
    });
  } catch (err) {
    console.error(err);
    return true;
  }
  return false;
}
