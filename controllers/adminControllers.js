import Admin from "../models/adminModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};
class adminsController {
  static async createAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const errors = [];
      if (!password) {
        errors.push("Password is required");
      } else if (!validator.isStrongPassword(password)) {
        errors.push("Password not strong enough");
      }
      if (!username) {
        errors.push("Username is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      try {
        const existingAdmin = await Admin.findOne({
          where: {
            [Op.or]: [{ username: username }],
          },
        });

        if (existingAdmin) {
          errors.push("admin already exists");
          return res.status(400).json({ errors });
        }

        const newAdmin = await Admin.create({
          username,
          password,
        });
        if (!newAdmin) {
          errors.push("Error creating admin");
          return res.status(500).json({ errors });
        }
        const token = createToken(newAdmin.id);
        return res.status(201).json({ newAdmin, token });
      } catch (sequelizeError) {
        return res.status(500).json({ message: sequelizeError.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async loginAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const errors = [];
      let admin;
      let match;

      if (!username || !password) {
        errors.push("Please Fill all required fields");
      } else {
        admin = await Admin.findOne({ where: { username } });
        if (!admin) {
          errors.push("admin not found");
        } else {
          match = await bcrypt.compare(password, admin.password);
          if (!match) {
            errors.push("incorrect password");
          }
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const token = createToken(admin.id);
      return res.status(200).json({ username, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllAdmins(req, res) {
    try {
      const admins = await Admin.findAll();
      if (admins.length === 0) {
        return res.status(404).json("there are no available Admins");
      }
      return res.status(200).json(admins);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default adminsController;
