import express from "express";
import usersController from "../controllers/userControllers.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/register", usersController.createUser);

//loging user
userRouter.post("/login", usersController.loginUser);

// Get all users
userRouter.get("/", usersController.getAllUsers);

// //get a user by ID
// userRouter.get('/:id', usersController.findUserById);

// //update user
// userRouter.patch('/:id', usersController.updateUser);

// //delete a user
// userRouter.delete('/:id', usersController.deleteUser);

export default userRouter;
