import { eError } from "../types/tError";
import { IUser } from "../types/tUser";
import { getDataUsers, setDataUsers } from "./dataWorker";

export function getUsers(offset: number, limit: number): IUser[] | eError {
  const users: IUser[] | eError = getDataUsers();

  if (!Array.isArray(users)) {
    return users;
  }
  if (users.length <= offset) {
    return eError.user404;
  }

  const start: number = offset;
  const end: number = offset + (limit ? limit : users.length); //if limit 0 it will send all users

  return users.slice(start, end);
}

export function getUser(id: number): IUser[] | eError {
  const users: IUser[] | eError = getDataUsers();
  if (!Array.isArray(users)) {
    return users;
  }

  const user: IUser[] = users.filter((user: IUser) => user.id === id);
  if (!user.length) {
    return eError.user404;
  }

  return user;
}

export function addUser(user: IUser): IUser[] | eError {
  const users: IUser[] | eError = getDataUsers();
  if (!Array.isArray(users)) {
    return users;
  }

  if (users.find((u) => u.name === user.name)) {
    return eError.user403;
  }

  user.id = Math.max(...Object.values(users.map((u) => u.id))) + 1;
  users.push(user);

  return setDataUsers(users);
}

export function updateUser(user: IUser): IUser[] | eError {
  const users: IUser[] | eError = getDataUsers();
  if (!Array.isArray(users)) {
    return users;
  }

  const i: number = users.findIndex((u: IUser) => u.id === user.id);
  if (i === -1) {
    return eError.user404;
  }

  if (users.find((u) => u.name === user.name && u.id !== users[i].id)) {
    return eError.user403;
  }
  if (user.address === "none") {
    user.address = users[i].address;
  }

  users[i] = user;
  return setDataUsers(users);
}

export function deleteUser(id: number): IUser[] | eError {
  const users: IUser[] | eError = getDataUsers();
  if (!Array.isArray(users)) {
    return users;
  }

  const i: number = users.findIndex((u: IUser) => u.id === id);
  if (i === -1) {
    return eError.user404;
  }

  users.splice(i, 1);
  return setDataUsers(users);
}

export function initUser(): IUser {
  const user: IUser = {
    id: 0,
    name: "User",
    age: 1,
    address: "none",
  };
  return user;
}
