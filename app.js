const express = require("express");
const userRouter = require("./router/userRouter");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use("/user", userRouter);
module.exports = app;
