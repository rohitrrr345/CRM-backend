import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js';
import connectDB from './Config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config({'path': './Config/config.env'});
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
