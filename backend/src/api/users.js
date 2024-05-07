import { Router } from "express";
import { Users } from "../db/mongo.js";

const users = Router();

users.get("/find", async (req, res) => {
  const users = await Users.find({});
  return res.status(201).json({ data: users });
});

export default users;