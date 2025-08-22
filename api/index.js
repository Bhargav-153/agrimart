import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/User.route.js'
import NurseryRoute from './routes/Nursery.route.js'
import FarmerRoute from './routes/Farmer.route.js';
import FarmProductRoute from './routes/FarmProduct.route.js'; // ✅ CORRECT IMPORT
import farmerProductRoutes from './routes/FarmerProduct.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


dotenv.config()

const PORT = process.env.PORT

const app = express()

// These lines are needed to serve uploads from relative paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Make /uploads folder publicly accessible
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

//route setup
app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/nursery',NurseryRoute)
app.use('/api/farmers', FarmerRoute);
// app.use('/api/farmProducts', FarmProductRoute);
app.use("/api/farmerProducts", farmerProductRoutes);


app.use(express.json())

mongoose.connect(process.env.MONGODB_CONN, { dbName: 'agrimart' })
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    })
  })


