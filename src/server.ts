import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

interface IError {
  message: string;
  statusCode: number;
  source?: Error | any;
}

interface IUser {
  id: number;
  name: string;
}

const users: IUser[] = [
  { id: 0, name: "User1" },
  { id: 1, name: "User2" },
  { id: 2, name: "User3" },
];
/*console.log("ID users before: ", users);

 const reqId = "1";
{
  const i = users.findIndex((user) => user.id === Number(reqId));
  if (i !== -1) users.splice(i, 1);
}
console.log("ID users after: ", users);

console.log("NAME users before: ", users);
const reqName = "User4";
{
  const newID = Math.max(...Object.values(users.map((u) => u.id))) + 1;
  users.push({ id: newID, name: reqName });
}
console.log("NAME users after: ", users);

const reqLimit = "1";
const reqOffset = "1";
{
  const i = reqLimit ? Number(reqLimit) : 0;
  const o = reqOffset ? Number(reqOffset) : 0;
  console.log("Limit, Offset, users after: ", users.slice(o, i + o));
}  */

app.get("", function (req, res) {
  return res.send(`<h1>Wellcome to the root</h1><ul>
    <li>"/users" to show all users</li>
    <li>"/user" to show one user</li></ul>`);
});
app.get("/users", function (req, res) {
  return res.json(users);
});
app.get("/user", function (req, res) {
  return res.json(users[0]);
});

app.post("/user", function (req, res) {
  const { id, name }: IUser = req.body;
  if (id && name) {
    if (users.find((user) => id === user.id)) {
      return res.json("ID is existed");
    } else {
      users.push({ id, name });
      return res.json(users);
    }
  }
  return res.json("Bed request");
});

app.put("/user:id", function (req, res) {
  const { id } = req.params;
  const query = req.query;
  const updates = req.body;

  //to impliment

});

try {
  app.listen(8080, function () {
    console.log("server is up and running on 8080 port");
  });
} catch (error) {
  console.log(error);
}
