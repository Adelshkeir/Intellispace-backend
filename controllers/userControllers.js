import User from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

class usersController {
  //create user
  static async createUser(req, res) {
    try {
      const { username, email, password, phonenumber, location } = req.body;
      const errors = [];

      if (!email || email.trim() === "") {
        errors.push("Email is required");
      } else if (!validator.isEmail(email)) {
        errors.push("Invalid email format");
      }

      if (!password) {
        errors.push("Password is required");
      } else if (!validator.isStrongPassword(password)) {
        errors.push("Password not strong enough");
      }

      if (!username) {
        errors.push("Username is required");
      }

      if (!phonenumber) {
        errors.push("phonenumber is required");
      }

      if (!location) {
        errors.push("location is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
          where: {
            [Op.or]: [{ username: username }, { email: email }],
          },
        });

        if (existingUser) {
          errors.push("Username or email already exists");
          return res.status(400).json({ errors });
        }

        const newUser = await User.create({
          username,
          email,
          password,
          phonenumber,
          location,
        });

        if (!newUser) {
          errors.push("Error creating user");
          return res.status(500).json({ errors });
        }

        const token = createToken(newUser.id);
        return res.status(201).json({ newUser, token });
      } catch (sequelizeError) {
        return res.status(500).json({ message: sequelizeError.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //login user
  static async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const errors = [];
      let user;
      let match;

      if (!username || !password) {
        errors.push("Please Fill all required fields");
      } else {
        user = await User.findOne({ where: { username } });
        if (!user) {
          errors.push("user not found");
        } else {
          match = await bcrypt.compare(password, user.password);
          if (!match) {
            errors.push("incorrect password");
          }
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const token = createToken(user.id);
      return res.status(200).json({ username, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
        return res.status(404).json("there are no available users");
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //update a use by id
  //   static async updateUser(req, res) {
  //     try {
  //       const [updatedUser] = await User.update(req.body, {
  //         where: {
  //           id: req.params.id,
  //         },
  //       });
  //       if (!updatedUser) {
  //        return res.status(404).json('please enter the fields you want to edit');
  //       }
  //       const user= await User.findByPk(req.params.id);
  //       return res.status(200).json(user);
  //     } catch (error) {
  //      return res.status(500).json({ message: error.message });
  //     }
  //   }
  // //delete a user
  //   static async deleteUser(req, res) {
  //     try {
  //       const deleteduser = await User.findByPk(req.params.id)
  //       if (!deleteduser) {
  //       return res.status(404).json('the user was not found');
  //       }

  //       await User.destroy({
  //         where:{
  //           id:req.params.id,
  //         },
  //       })
  //       return res.status(200).json({ deleteduser });
  //     } catch (error) {
  //       return res.status(500).json({ message: error.message });
  //     }
  //   }
  // //find user by id
  //   static async findUserById(req, res) {
  //     try {
  //       const user = await User.findByPk(req.params.id);
  //       if (!user) {
  //         return res.status(404).json('user not found');
  //       }
  //       return res.status(200).json(user);
  //     } catch (error) {
  //       return res.status(500).json({ message: error.message });
  //     }
  //   }

  // static async makeTransaction(req,res){

  // }
}

export default usersController;