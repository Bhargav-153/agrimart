import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dispatchNotification } from "../helpers/dispatchNotification.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      // user already registered
      return next(handleError(409, "User already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password);
    // register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "Invalid credentials"));
    }
    const hashedPassword = user.password;

    const comparePassword = bcryptjs.compareSync(password, hashedPassword);
    if (!comparePassword) {
      return next(handleError(401, "Invalid credentials "));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    // Dispatch a non-blocking notification for login
    try {
      dispatchNotification(
        {
          userId: user._id,
          title: "Welcome back to Agrimart",
          message: `Hi ${
            user.name || "user"
          }, you have successfully logged in.`,
          email: user.email,
          phone: user.phone,
          type: "auth",
        },
        { sendEmail: true, sendSMS: false }
      );
    } catch (e) {
      console.error("Login notification error:", e?.message || e);
    }

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let user;
    user = await User.findOne({ email });
    if (!user) {
      //  create new user
      const password = Math.random().toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

      user = await newUser.save();
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    // Dispatch a non-blocking notification for login (google)
    try {
      dispatchNotification(
        {
          userId: user._id,
          title: "Welcome to Agrimart",
          message: `Hi ${
            user.name || "user"
          }, you have successfully logged in with Google.`,
          email: user.email,
          phone: user.phone,
          type: "auth",
        },
        { sendEmail: true, sendSMS: false }
      );
    } catch (e) {
      console.error("GoogleLogin notification error:", e?.message || e);
    }

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    // Dispatch a logout notification (best-effort; non-blocking)
    try {
      const userId = req.user?._id || null;
      // if req.user not available, we still attempt using query/body if provided
      const candidateId = userId || req.body.userId || req.query.userId || null;
      if (candidateId) {
        dispatchNotification(
          {
            userId: candidateId,
            title: "Logged out",
            message: `You have successfully logged out of Agrimart.`,
            email: req.body?.email || undefined,
            phone: req.body?.phone || undefined,
            type: "auth",
          },
          { sendEmail: true, sendSMS: false }
        );
      }
    } catch (e) {
      console.error("Logout notification error:", e?.message || e);
    }

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
