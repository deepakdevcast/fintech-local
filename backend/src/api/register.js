import { Router } from "express";
import { Users } from "../db/mongo.js";
import registerMiddleware from "./middleware/register.js";

const register = Router();

register.post("/", registerMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await Users.findOne({email: email});
  if (userExists) {
    return res.status(400).json({ message: "User already exists! Reset Your Password!" });
  }
  await Users.create({ name, email, password, balance: 5000 });
  return res.status(201).json({ message: "User created successfully!" });
});

export default register;