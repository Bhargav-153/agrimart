import express from "express";
import {
  GoogleLogin,
  Login,
  Logout,
  register,
} from "../controllers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoogleLogin);
AuthRoute.get("/logout", Logout);

export default AuthRoute;
