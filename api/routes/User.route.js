import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/User.controller.js";
import upload from "../config/multer.js";


const UserRoute = express.Router();

UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single('file'), updateUser);
UserRoute.delete("/delete-user/:userid", deleteUser);


export default UserRoute;
