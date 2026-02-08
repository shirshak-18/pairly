const express = require("express");
const userRouter = require("./router/userRouter");
const statusRouter = require("./router/statusRouter");
const app = express();
const cors = require("cors");
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://pairly-rho.vercel.app/",
];

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pairly-rho.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }),
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Pairly API is running 🚀");
});

app.use("/user", userRouter);
app.use("/status", statusRouter);
module.exports = app;
