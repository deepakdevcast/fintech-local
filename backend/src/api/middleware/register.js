import { registerBodySchema } from "./schemaValidate.js";

const registerMiddleware = async (req, res, next) => {
  const {name, email, password} = req.body;
  const { error } = registerBodySchema.safeParse({name, email, password});
  if (error) {
    return res.status(400).json({ message: JSON.parse(error.message) });
  }
  next();
}

export default registerMiddleware;