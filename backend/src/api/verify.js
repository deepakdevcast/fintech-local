import { Router } from "express";
const verifyToken = Router();

verifyToken.get('/', (req, res)=>{
  return res.status(200).json({ message: 'Token is valid!'});
});

export default verifyToken;