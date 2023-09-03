import express from "express";
import cors from "cors";
import authRouter from "./Router/Auth.js";
import init from "./db/Conn.js";
import uR from "./Router/Users.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const baseR = express.Router();
// app.use("/api", baseR);
app.use("/auth", authRouter);
app.use("/user", uR);

const PORT = 5000;
app.listen(PORT, () => {
  console.clear()
  init()
  console.log(`Server @ http://localhost:${PORT}`);
});
