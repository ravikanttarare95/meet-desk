import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/User.js";

const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `User with email ${email} already exists` });
    }

    const nameRegex = /^[A-Z][a-zA-Z'-]{1,49}(?: [A-Z][a-zA-Z'-]{1,49})*$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter your full name using only letters, spaces, apostrophes, or hyphens, with each name starting with a capital letter and between 2 and 50 characters long",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address (user@xyz.com)",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a password between 8-20 characters that includes at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &)",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const adminLogin = async (req, res) => {};

export { adminSignup, adminLogin };
