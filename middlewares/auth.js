import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const protect = async (req, res, next) => {
  const headerInput = req.headers["authorization"];
  const token = headerInput && headerInput.split(" ")[1];

  if (token == null) return res.status(401).json("not authorized");

  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded);

  const user = await User.findByPk(decoded.id);
  const admin = await Admin.findByPk(decoded.id);

  req.user = user || admin;

  if (!req.user) return res.status(404).json("user not found");

  next();
};

export default protect;
