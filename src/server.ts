import express from "express";
import cors from "cors";
import routeHome from "./routes/home";
import routeUsers from "./routes/users";
import routeMSG from "./routes/msg";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("", routeHome);
app.use("/msg", routeMSG);
app.use("/user", routeUsers);
app.use("/users", routeUsers);

try {
  app.listen(8080, function () {
    console.log("server is up and running on 8080 port");
  });
} catch (error) {
  console.log(error);
}
