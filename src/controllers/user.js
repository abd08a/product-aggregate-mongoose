import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      id: uuidv4(),
      full_name: req.body.full_name,
      email: req.body.email,
      password: hash,
      products: [],
    };

    const newUser = new UserModel(userData);
    const response = await newUser.save();

    return res.json({ products: response });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(500).json({ message: "user data is not ok" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(500).json({ message: "user data is not ok" });
    }

    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );

    console.log(isPasswordMatch);

    return res.json({ jwt: jwt_token, message: "user logged in successfully" });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export { SIGN_UP, LOG_IN };
