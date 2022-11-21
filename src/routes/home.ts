import { Router } from "express";

const routeHome: Router = Router();

routeHome.get("", function (req, res) {
  return res.send(`<h1>Wellcome to the Home route</h1>
    <ul>
      <li>"GET /msg": return the content of "data.txt"</li>
      <li>"GET /users": return the content of "user.json"</li>
      <li>"GET users/:userId": get a user by user id from "user.json"</li>
      <li>"POST users/": add new user into "user.json"</li>
      <li>"PUT users/:userId": update the user by user id in "user.json"</li>
      <li>"DELETE users/:userId": delete a user in "user.json"</li>
    </ul>`);
});

export default routeHome;
