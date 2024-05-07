import mongoose, { Mongoose } from "mongoose";
import EnvConfig from "../config.js";


const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: Number
});

const TransactionsSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  amount: String,
});

export const Users = mongoose.model('Users', UsersSchema);
export const Transactions = mongoose.model('Transactions', TransactionsSchema);

export const mongoInitialize = async () => {
  const mongoInstance = await mongoose.connect(EnvConfig.get('MONGO_URL'))
  return mongoInstance;
}
