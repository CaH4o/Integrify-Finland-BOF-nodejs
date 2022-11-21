import { Router } from "express";
import { readFileSync } from "fs";
import { join } from "path";

const routeMSG: Router = Router();

routeMSG.get("", function (req, res) {
  const fileName: string = "../data/data.txt";
  const fileContent: string = readFileSync(join(__dirname, fileName), "utf-8");
  return res.status(200).send(fileContent);
});

export default routeMSG;
