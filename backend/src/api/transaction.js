import { Router } from "express";
import { Transactions, Users } from "../db/mongo.js";
import transactionMiddleware from "./middleware/transaction.js";
import { getAccountDetails, writeTransaction } from "../utils/db_query.js";

const transaction = Router(); 

transaction.post("/send", transactionMiddleware, async (req, res) => {
  const { receiver_id, amount } = req.body;
  const sender_id = req.user.id;
  try {
  if (sender_id === receiver_id) {
    return res.status(400).send("Transaction in same account is not possible!");
  }
  const {balance} = await getAccountDetails(sender_id);
  if (balance < amount) {
    return res.status(400).json({message: "Insufficient Balance"});
  }
  const transactionData = await writeTransaction(sender_id, receiver_id, amount);
  return res.status(200).json({ message: `Transaction Successful`, trxId: transactionData.id});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Transaction Failed" });
  }
});

export default transaction;