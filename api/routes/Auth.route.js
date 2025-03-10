import express from 'express';
import { GoogleLogin, Login, register } from '../controllers/Auth.controller.js';

const AuthRoute  = express.Router()

AuthRoute.post('/register', register)
AuthRoute.post('/login', Login)
AuthRoute.post('/google-login', GoogleLogin)

export default AuthRoute;