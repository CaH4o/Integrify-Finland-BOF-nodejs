import express from "express";
import cors from "cors";

import routeHome from "./routes/home";
import routeMSG from "./routes/msg";
import routeUsers from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("", routeHome);
app.use("/msg", routeMSG);
app.use("/users", routeUsers);
app.get("*", function (req, res) {
  res.status(404).json({ message: "Page Not Found", statusCode: 404 });
});

try {
  app.listen(8080, function () {
    console.log("server is up and running on 8080 port");
  });
} catch (error) {
  console.log(error);
}
