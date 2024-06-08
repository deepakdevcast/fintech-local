import { Router } from "express";
import { Users } from "../db/mongo.js";
import registerMiddleware from "./middleware/register.js";
import { createAccount, getUserDetails, registerUserToDb } from "../utils/db_query.js";

const register = Router();

register.post("/", registerMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await getUserDetails(email);
  if (Object.keys(userExists).length > 0) {
    return res.status(400).json({ message: "User already exists! Please Login!" });
  }
  const { id } = await registerUserToDb({
    name,
    email,
    password
  })
  await createAccount(id);
  return res.status(201).json({ message: "User created successfully!" });
});

export default register;