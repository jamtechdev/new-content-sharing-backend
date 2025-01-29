const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models/index.js");
const User = db.users;
require("dotenv").config();
// const User = db.users;
// const regionDb = db.Regions;
// const roleDb = db.roles;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

exports.signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      email_verified_at,
      is_blocked_by_platform,
      password,
      address,
      phone_number,
      birthdate,
      social,
      bio,
      region_id,
      avatar,
      role_id,
    } = req.body;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // if (!region_id) {
    //   return res.status(400).json({
    //     status: 400,
    //     success: false,
    //     message: "Region is required",
    //   });
    // }

    if (!role_id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Role is required",
      });
    }

    let existing_user = await User?.findOne({ where: { email } });
    if (existing_user)
      return res.status(400).json({ message: "Email already registered" });
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User?.create({
      name,
      email,
      email_verified_at,
      password: hashedPassword,
      is_blocked_by_platform,
      address,
      phone_number,
      birthdate,
      social,
      bio,
      region_id,
      avatar,
      role_id,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "360d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      code: 201,
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
// Login API
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "password", "avatar"],
      include: [
        {
          model: db.Regions,
          as: "region",
          attributes: ["name"],
        },
        {
          model: db.roles,
          as: "role",
          attributes: ["name", "guard_name"],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(200).json({
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        region: user.region ? user.region.name : null,
        role: user.role ? user.role.name : null,
        guard_name: user.role ? user.role.guard_name : null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
