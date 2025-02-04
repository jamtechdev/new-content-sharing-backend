const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const cors = require("cors");
const userRouter = require("./routes/Api/users/users.route");
const ProfileRouter = require("./routes/Api/users/usersProfile.route");
const contentRouter = require('./routes/Api/users/content.route')
const path = require('path')
const fs = require('fs')


if (!fs.existsSync('./public/uploads')){
  fs.mkdirSync("./public/uploads", { recursive: true });
}

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
//  user auth route
app.use("/api/auth", userRouter);
// user profile route
app.use("/api/profile", ProfileRouter);
app.use('/api/content', contentRouter)

app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
