const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models/index.js");
const User = db.users;
require("dotenv").config();
const mailToSpecificUser = require("../../services/emailService.js");
const {cloudinaryImageUpload} = require('../../services/cloudinaryService.js')

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
      // avatar,
      role_id,
    } = req.body;
    const avatar = req.file
    console.log("Avatar file path", req.file)
    if (!req.file) {
      return res.status(400).json({code: 400, success: false, message: 'No file uploaded' });
    }
    const avatarImageUri = await cloudinaryImageUpload(avatar.path)
    console.log("Avatar image uri=======>", avatarImageUri)
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }

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
      return res.status(400).json({
        status: 400,
        success: false,

        message: "Email already registered",
      });
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
      avatar: avatarImageUri,
      role_id,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      code: 201,
      message: "User created successfully",
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        address: newUser.address,
        phone_number: newUser.phone_number,
        birthdate: newUser.birthdate,
        social: newUser.social,
        bio: newUser.bio,
        region_id: newUser.region_id,
        avatar: newUser.avatar,
        role_id: newUser.role_id,
      },
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
    // validate
    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Email and password are required",
      });
    }
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

    const token = jwt.sign(
      { userId: user.id, role: user?.role?.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
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

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Logout successful",
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

exports.loginWithGoogle = async (req, res) => {
  try {
    const { accessToken, email, name, photoURL } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });
    if (user) {
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
          role_id: user.role_id,
        },
      });
    } else {
      const newUser = await User.create({
        email,
        name,
        avatar: photoURL,
        access_token: accessToken,
        role_id: 3,
        password: "Password@123#",
        platfrom_type: "google",
      });
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
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
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          role_id: newUser.role_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let payload = {
      id: user.id,
      email: user.email
    }
    const resetToken = jwt.sign(payload, process.env.RESET_PASSWORD_SECRET_KEY, { expiresIn: '5m' })
    const subject = `Password reset mail to: ${user.email}`;
    const content = `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            h1 {
              color: #007bff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Dear ${user.email},</h1>
            <p>Kindly reset your password using this given link.</p>
            <p>Password reset link: <strong style="color: #007bff;"><button><a href='${process.env.CLIENT_SIDE_URI}?token=${resetToken}'>Verify Email</a></button></strong></p>
            <p>Please click on link to reset your password</p>
            <p>If you have any queries, feel free to contact us.</p>
            <p>Regards,<br>Content Sharing</p>
            </div>
        </body>
        </html>`;
    await mailToSpecificUser(user.email, subject, content);
    return res.status(200).json({success: true, message: "Password reset link sent to you mail"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message });
  }
};

exports.resetPassword = async (req, res)=>{
  try {
    const {token, password, confirmPassword} = req.body
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET_KEY)
    const user = await User.findOne({where: {id: decoded.id, email: decoded.email}, include: [{
      model: db.roles,
      as: "role",
      attributes: ["name", "guard_name"],
    },] });

    if (!user || user.role.name !== "user") {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
      }
      if(password !== confirmPassword){
        return res.status(400).json({success: false, message: "New password and confirm password should be the same"})
      }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        code: 400,
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt)
    await User.update({password: hashedPassword}, {where: {id: user.id, email: user.email}})
    return res.status(201).json({success: true, message: "User's password updated successfully"})
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ success: false, message: 'Reset token has expired' });
    }
    return res.status(500).json({success: false, message: error.message})
  }
}