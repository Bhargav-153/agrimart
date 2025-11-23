import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dispatchNotification } from "../helpers/dispatchNotification.js";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password);

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

// LOGIN
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "User not found. Please sign up to create an account."));
    }

    const comparePassword = bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return next(handleError(401, "Invalid credentials"));
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

    // WEBSITE notification (short) + EMAIL (detailed)
    try {
      await dispatchNotification(
        {
          userId: user._id,
          title: "Login Successful",
          // short message shown on website
          message: `You have successfully logged in to your Agrimart account.`,
          email: user.email,
          type: "auth",
          // long email-only template
          emailTitle: "Login Successful",
          emailMessage: `Hi ${
            user.name || "user"
          },\n\nYou have successfully logged in to your Agrimart account.\n\nIf this wasn’t you, please reset your password immediately to secure your account.\n\nThanks,\nAgrimart Team`,
        },
        { sendEmail: true }
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

// GOOGLE LOGIN
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = bcryptjs.hashSync(password);

      user = await new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      }).save();
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

    // WEBSITE notification (short) + EMAIL (detailed)
    try {
      await dispatchNotification(
        {
          userId: user._id,
          title: "Login Successful",
          // short message shown on website
          message: `You have successfully logged in to your Agrimart account.`,
          email: user.email,
          type: "auth",
          emailTitle: "Login Successful",
          emailMessage: `Hi ${
            user.name || "user"
          },\n\nYou have successfully logged in to your Agrimart account.\n\nIf this wasn’t you, please reset your password immediately to secure your account.\n\nThanks,\nAgrimart Team`,
        },
        { sendEmail: true }
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

// LOGOUT
export const Logout = async (req, res, next) => {
  try {
    // Resolve userId/email before clearing cookie so we can still read token
    try {
      let userId = req.user?._id || req.body.userId || req.query.userId;
      let email = req.body?.email;
      let name = req.user?.name || req.body?.name;

      // If we don't have a userId, try to recover it from a token (cookie/header/body)
      if (!userId) {
        const tokenFromCookie = req.cookies?.access_token;
        const authHeader = req.headers?.authorization;
        const tokenFromHeader =
          authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : undefined;
        const token = tokenFromCookie || tokenFromHeader || req.body?.token;

        if (token) {
          try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // token payload may include _id or id
            userId = userId || payload?._id || payload?.id;
            email = email || payload?.email;
          } catch (err) {
            console.error(
              "Error decoding token for logout notification:",
              err?.message || err
            );
          }
        }
      }

      // If we still don't have an email or name but have a userId, fetch from DB
      if (userId && (!email || !name)) {
        try {
          const foundUser = await User.findById(userId).lean();
          email = email || foundUser?.email;
          name = name || foundUser?.name;
        } catch (err) {
          console.error(
            "Error fetching user email for logout notification:",
            err?.message || err
          );
        }
      }

      if (userId) {
        const emailTitle = "Logged out";
        const emailMessage = `Hi ${
          name || "user"
        },\n\nYou have successfully logged out of your Agrimart account.\n\nIf you didn’t perform this action, please log in and reset your password to protect your account.\n\nStay secure,\nAgrimart Team`;

        await dispatchNotification(
          {
            userId,
            title: "Logged out",
            // short website message
            message: "You have successfully logged out of Agrimart.",
            email, // may be undefined, dispatchNotification will skip sending email if missing
            type: "auth",
            // email-only content
            emailTitle,
            emailMessage,
          },
          { sendEmail: true }
        );
      }
    } catch (e) {
      console.error("Logout notification error:", e?.message || e);
    }

    // Now that notification has been dispatched (or attempted), clear the cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
