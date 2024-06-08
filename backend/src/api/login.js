import { Router } from "express";
import loginMiddleware from "./middleware/login.js";
import jwt from "jsonwebtoken";
import EnvConfig from "../config.js";
import { getUserDetails, verifyUserFromDb } from "../utils/db_query.js";

const login = Router();
login.post('/', loginMiddleware , async (req, res)=> {
  const { email, password } = req.body;
  const isUserValid = await verifyUserFromDb({ email, password });
  
  if (Object.keys(isUserValid).length > 0) {
    const token = jwt.sign({ id: isUserValid.id, email: isUserValid.email }, EnvConfig.get('JWT_SECRET'));
    return res.status(200).json({ message: `${isUserValid.name} login successfully!`, token });
  } else {
    const userEmailExists = await getUserDetails(email);
    if (Object.keys(userEmailExists).length > 0) return res.status(400).json({ message: "Incorrect Password!" });
  }
  return res.status(400).json({ message: "User not Register! Please Register First!" });
});

export default login;