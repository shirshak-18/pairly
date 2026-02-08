const express = require("express");
const userRouter = require("./router/userRouter");
const statusRouter = require("./router/statusRouter");
const app = express();
const cors = require("cors");
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://pairly.vercel.app", // add your Vercel domain later
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Pairly API is running 🚀");
});

app.use("/user", userRouter);
app.use("/status", statusRouter);
module.exports = app;
