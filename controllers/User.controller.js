import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendToken } from '../utils/sendToken.js';

export const register = async (req, res) => {
    try {
      const { name, email, password} = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' });
      }
  
  
      user = await User.create({
        name,
        email,
        password,
      });
  
    
  
   sendToken(res,user,"Registered Sucessfully",201);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email })
        .select('+password')
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User does not exist',
        });
      }
  
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect password',
        });
      }
  
      sendToken(res, user, `Welcome back, ${user.name}`, 200);
  
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
