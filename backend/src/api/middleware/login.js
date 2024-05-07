import { loginBodySchema } from "./schemaValidate.js";

const loginMiddleware = async (req, res, next) => {
  const {email, password} = req.body;
  const { error } = loginBodySchema.safeParse({ email, password });
  if (error) {
    return res.status(400).json({ message: JSON.parse(error.message) });
  }
  next();
}

export default loginMiddleware;