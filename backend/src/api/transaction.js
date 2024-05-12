import { Router } from "express";
import { Transactions, Users } from "../db/mongo.js";
import transactionMiddleware from "./middleware/transaction.js";

const transaction = Router(); 

transaction.post("/send", transactionMiddleware, async (req, res) => {
  const { receiver, amount } = req.body;
  const sender = req.user.id;
  try {
    const senderAccount = (await Users.findById(sender));
  const receiverAccount = (await Users.findById(receiver));
  if (!senderAccount || !receiverAccount) {
    return res.status(400).send("Invalid User");
  }
  if (senderAccount.balance < amount) {
    return res.status(400).json({message: "Insufficient Balance"});
  }
  } catch (err) {
    return res.status(400).json({ message: "Transaction Failed", err: err });
  }
  const session = await Users.startSession();
  await session.startTransaction();
  try {
    await Users.findByIdAndUpdate(sender, {
      "$inc": {
        "balance": -amount,
      }
    }, { session });
    await Users.findByIdAndUpdate(receiver, {
      "$inc": {
        "balance": +amount,
      }
    }, { session });
    const transactionDetail = await Transactions.create([{sender, receiver, amount}]);
    await session.commitTransaction();
    await session.endSession();
    return res.status(200).json({ message: `Transaction Successful`, trxId: transactionDetail[0].id});
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return res.status(400).json({ message: "Transaction Failed" });
  }
});

export default transaction;