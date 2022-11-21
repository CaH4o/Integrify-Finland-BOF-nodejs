import { Router } from "express";

import { IUser } from "../types/tUser";

const routeUsers: Router = Router();

const users: IUser[] = [
  { id: 0, name: "User1", address: "Address1" },
  { id: 1, name: "User2", address: "Address1" },
  { id: 2, name: "User3", address: "Address1" },
];

routeUsers.get("", function (req, res) {
  const { limit, offset } = req.query;
  const o: number = offset ? Number(offset) : 0;
  const i: number = limit ? Number(limit) : users.length;
  if (isNaN(o) || isNaN(i)) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }

  if (users.length > o && i) {
    return res.status(200).json(users.slice(o, o + i));
  } else {
    return res
      .status(404)
      .json({ message: "Not Found", statusCode: 404 });
  }
});

export default routeUsers;
