import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  const Lead = mongoose.model('Lead', leadSchema);
  export default Lead;
  