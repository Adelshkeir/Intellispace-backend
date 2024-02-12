import express from "express";
import adminsController from "../controllers/adminControllers.js";

const adminRouter = express.Router();

// Create a new admin
adminRouter.post("/login", adminsController.loginAdmin);

//login admin
adminRouter.post("/register", adminsController.createAdmin);

// Get all admins
adminRouter.get("/", adminsController.getAllAdmins);

export default adminRouter;
