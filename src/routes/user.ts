import { Router } from "express";

import { IUser } from "../types/tUser";

const routeUser: Router = Router();

const users: IUser[] = [
  { id: 0, name: "User1", address: "Address1" },
  { id: 1, name: "User2", address: "Address1" },
  { id: 2, name: "User3", address: "Address1" },
];

routeUser.get("/:userId", function (req, res) {
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
  
  routeUser.post("", function (req, res) {
    const { name, address }: IUser = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: "Bad Request", statusCode: 400 });
    }
  
    if (users.find((user) => name === user.name)) {
      return res.status(403).json({ message: "Already Exists", statusCode: 403 });
    }
  
    const id: number = Math.max(...Object.values(users.map((u) => u.id))) + 1;
    const user: IUser = { id, name, address };
    users.push(user);
    return res.status(201).json(user);
  });
  
  routeUser.put("/:userId", function (req, res) {
    const { name, address }: IUser = req.body;
    const id: number = Number(req.params.userId);
    if (!name || !address || isNaN(id)) {
      return res.status(400).json({ message: "Bad Request", statusCode: 400 });
    }
  
    const i: number = users.findIndex((user: IUser) => user.id === id);
    if (i === -1) {
      return res.status(404).json({ message: "Not Found", statusCode: 404 });
    }
  
    users[i].name = name;
    users[i].address = address;
    return res.status(201).json(users[i]);
  });
  
  routeUser.delete("/:id", function (req, res) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Bad Request", statusCode: 400 });
    }
  
    const i = users.findIndex((user: IUser) => user.id === id);
    if (i === -1) {
      return res
      .status(404)
      .json({ message: "Not Found", statusCode: 404 });
    }
  
    return res.status(202).json(users.splice(i, 1));
  });

  export default routeUser