import { Router } from "express";

import { IUser } from "../types/tUser";
import { eError } from "../types/tError";
import { errorResponse } from "../errors/errorsResponse";
import { getUsers, getUser,  addUser, updateUser, initUser, deleteUser } from "../data/userWorker";

const routeUsers: Router = Router();

routeUsers.get("", function (req, res) {
  const { limit, offset } = req.query;
  const o: number = offset ? Number(offset) : 0;
  const l: number = limit ? Number(limit) : 0;

  if (isNaN(o) || isNaN(l)) {
    return res.status(400).json(errorResponse.user400);
  }

  const users: IUser[] | eError = getUsers(o, l);
  if (!Array.isArray(users)) {
    return res
      .status(errorResponse[users].error.status)
      .json(errorResponse[users]);
  }

  return res.status(200).json(users);
});

routeUsers.get("/:userId", function (req, res) {
  const id: number = Number(req.params.userId);

  if (isNaN(id)) {
    return res.status(400).json(errorResponse.user400);
  }

  const user: IUser[] | eError = getUser(id);
  if (!Array.isArray(user)) {
    return res
      .status(errorResponse[user].error.status)
      .json(errorResponse[user]);
  }

  return res.status(200).json(user);
});

routeUsers.post("", function (req, res) {
  const { name, age, address }: IUser = req.body;

  // I decided the address is not required
  if (!name || isNaN(age)) {
    return res.status(400).json(errorResponse.user400);
  }
  
  const user: IUser = { ...initUser(), name };
  user.age = Number(age);
  if (address) {
    user.address = address;
  }

  const users: IUser[] | eError = addUser(user);
  if (!Array.isArray(users)) {
    return res
      .status(errorResponse[users].error.status)
      .json(errorResponse[users]);
  }

  return res.status(201).json(users);
});

routeUsers.put("/:userId", function (req, res) {
  const { name, age, address }: IUser = req.body;
  const id: number = Number(req.params.userId);

  // I decided the address is not required
  if (!name || isNaN(age) || isNaN(id)) {
    return res.status(400).json(errorResponse.user400);
  }

  const user: IUser = { ...initUser(), id, name };
  user.age = Number(age);
  if (address) {
    user.address = address;
  }

  const users: IUser[] | eError = updateUser(user);
  if (!Array.isArray(users)) {
    return res
      .status(errorResponse[users].error.status)
      .json(errorResponse[users]);
  }

  return res.status(201).json(users);
});

routeUsers.delete("/:id", function (req, res) {
  const id: number = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json(errorResponse.user400);
  }

  const user: IUser[] | eError = deleteUser(id);
  if (!Array.isArray(user)) {
    return res
      .status(errorResponse[user].error.status)
      .json(errorResponse[user]);
  }

  return res.status(202).json(user);
});

export default routeUsers;
