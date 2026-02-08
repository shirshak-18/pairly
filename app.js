const express = require("express");
const userRouter = require("./router/userRouter");
const statusRouter = require("./router/statusRouter");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pairly-rho.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Pairly API is running 🚀");
});

app.use("/user", userRouter);
app.use("/status", statusRouter);
module.exports = app;
