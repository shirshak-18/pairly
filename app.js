const express = require("express");
const userRouter = require("./router/userRouter");
const statusRouter = require("./router/statusRouter");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use("/user", userRouter);
app.use("/status", statusRouter);
module.exports = app;
