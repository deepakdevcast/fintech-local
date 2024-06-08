import { Router } from "express";
import { getAccountDetails } from "../utils/db_query.js";

const accounts = Router();

accounts.get("/", async (req, res) => {
  const { id } = req.user;
  const data = await getAccountDetails(id);
  return res.status(200).json(data);
});

export default accounts;