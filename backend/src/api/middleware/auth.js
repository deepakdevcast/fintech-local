import jwt from "jsonwebtoken";
import EnvConfig from "../../config.js";

const tokenVerify = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "No token provided!" });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, EnvConfig.get('JWT_SECRET'));
    req.user = {
      email: decoded.email,
      id: decoded.id
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  }
}

export default tokenVerify;