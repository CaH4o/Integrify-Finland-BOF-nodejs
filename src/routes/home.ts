import { Router } from "express";

const routeHome: Router = Router();

routeHome.get("", function (req, res) {
  return res.send(`<h1>Wellcome to the Home route</h1>
    <ul>
    <li>"GET /msg": return the content of "data.txt"</li>
    <li>"GET /users": return the content of "user.json"</li>
    <li>"GET user/:userId": get a user by user id from "user.json"</li>
    <li>"POST user/": add new user into "user.json"</li>
    <li>"PUT user/:userId": update the user by user id in "user.json"</li>
    <li>"DELETE user/:userId": delete a user in "user.json"</li>
    </ul>`);
});

export default routeHome;
