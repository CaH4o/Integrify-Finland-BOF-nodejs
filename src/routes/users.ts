import { Router } from "express";
import { getDataUsers, setDataUsers } from "../data/dataWorker";

import { IUser } from "../types/tUser";

const routeUsers: Router = Router();

routeUsers.get("", function (req, res) {
  const users: IUser[] = getDataUsers();
  const { limit, offset } = req.query;
  const o: number = offset ? Number(offset) : 0;
  const i: number = limit ? Number(limit) : users.length;

  if (isNaN(o) || isNaN(i)) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }
  if (users.length <= o || !i) {
    return res.status(404).json({ message: "Not Found", statusCode: 404 });
  }

  return res.status(200).json(users.slice(o, o + i));
});

routeUsers.get("/:userId", function (req, res) {
  const users: IUser[] = getDataUsers();
  const id: number = Number(req.params.userId);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }

  const i: number = users.findIndex((user: IUser) => user.id === id);
  if (i === -1) {
    return res.status(404).json({ message: "Not Found", statusCode: 404 });
  }

  return res.status(200).json(users.slice(i, i + 1));
});

routeUsers.post("", function (req, res) {
  const users: IUser[] = getDataUsers();
  const { name, age, address }: IUser = req.body;

  if (!name || !age || !address) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }
  if (users.find((user) => name === user.name)) {
    return res.status(403).json({ message: "Already Exists", statusCode: 403 });
  }

  const id: number = Math.max(...Object.values(users.map((u) => u.id))) + 1;
  const user: IUser = { id, name, age, address };
  users.push(user);

  if (setDataUsers(users)) {
    return res
      .status(503)
      .json({ message: "Service Unavailable", statusCode: 503 });
  }

  return res.status(201).json(user);
});

routeUsers.put("/:userId", function (req, res) {
  const users: IUser[] = getDataUsers();
  const { name, age, address }: IUser = req.body;
  const id: number = Number(req.params.userId);

  // I decided the address is not required
  if (!name || isNaN(age) || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }

  const i: number = users.findIndex((user: IUser) => user.id === id);
  if (i === -1) {
    return res.status(404).json({ message: "Not Found", statusCode: 404 });
  }

  users[i] = address ? { id, name, age, address } : { ...users[i], name, age };
  if (setDataUsers(users)) {
    return res
      .status(503)
      .json({ message: "Service Unavailable", statusCode: 503 });
  }

  return res.status(201).json(users[i]);
});

routeUsers.delete("/:id", function (req, res) {
  const users: IUser[] = getDataUsers();
  const id: number = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Bad Request", statusCode: 400 });
  }

  const i = users.findIndex((user: IUser) => user.id === id);
  if (i === -1) {
    return res.status(404).json({ message: "Not Found", statusCode: 404 });
  }

  const user: IUser[] = users.splice(i, 1);
  if (setDataUsers(users)) {
    return res
      .status(503)
      .json({ message: "Service Unavailable", statusCode: 503 });
  }

  return res.status(202).json(user);
});

export default routeUsers;
