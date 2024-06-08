import { transactionBodySchema } from "./schemaValidate.js";

const transactionMiddleware = async (req, res, next) => {
  const {receiver_id, amount} = req.body;
  const { error } = transactionBodySchema.safeParse({sender_id: req.user.id, receiver_id, amount});
  if (error) {
    return res.status(400).json({ message: JSON.parse(error.message) });
  }
  next();
}

export default transactionMiddleware;