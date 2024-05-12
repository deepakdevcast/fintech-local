import { transactionBodySchema } from "./schemaValidate.js";

const transactionMiddleware = async (req, res, next) => {
  const {receiver, amount} = req.body;
  const { error } = transactionBodySchema.safeParse({sender: req.user.id, receiver, amount});
  if (error) {
    return res.status(400).json({ message: JSON.parse(error.message) });
  }
  next();
}

export default transactionMiddleware;