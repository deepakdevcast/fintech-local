import { Router } from "express";
import { Users } from "../db/mongo.js";
import loginMiddleware from "./middleware/login.js";
import jwt from "jsonwebtoken";
import EnvConfig from "../config.js";

const login = Router();
login.post('/', loginMiddleware , async (req, res)=> {
  const { email, password } = req.body;
  const userEmailExists = await Users.findOne({email});
  const userExists = await Users.findOne({email, password});
  if (!userEmailExists) {
    return res.status(400).json({ message: "User not Register! Please Register First!" });
  } else if (!userExists) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }
  const token = jwt.sign({ email: userExists.email, id: userExists._id.toString() }, EnvConfig.get('JWT_SECRET'));
  return res.status(200).json({ message: `${userExists.name} login successfully!`, token });
});

export default login;