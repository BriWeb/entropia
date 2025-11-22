import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function validateUser(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}
