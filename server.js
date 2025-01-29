const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const cors = require("cors");
const userRouter = require("./routes/Api/users/users.route");
// const ProfileRouter = require("./routes/Api/profile/profile.route");
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
// user profile route
// app.use("/api/profile", ProfileRouter);

app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
