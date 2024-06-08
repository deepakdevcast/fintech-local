import { Router } from "express";
import { Users } from "../db/mongo.js";
import { findUsersFromDb, getUserDetails } from "../utils/db_query.js";

const users = Router();

users.get("/", async (req, res) => {
  const { name, email } = req.query;
  const users = await findUsersFromDb({ name, email }, req.user.id);
  return res.status(201).json(users);
});

users.get("/details", async (req, res) => {
  const users = await getUserDetails(req.user.email);
  if (!users) return res.status(404).json({message: 'No users found'});
  return res.status(201).json(users);
});

export default users;