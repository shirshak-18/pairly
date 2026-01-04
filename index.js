require("dotenv/config");
const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(`MongoDB connection failed : ${err}`));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is up and running on http://localhost:${port}`);
});
