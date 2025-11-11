import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanagement',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  port: process.env.PORT || 3000,
};

