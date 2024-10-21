import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js';
import connectDB from './Config/db.js';

dotenv.config({'path': './Config/config.env'});
connectDB();

const app = express();
app.use(express.json());

app.use('/api', api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
