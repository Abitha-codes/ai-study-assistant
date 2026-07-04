import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn,
    }
  );
};