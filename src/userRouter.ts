import express from "express";
import { PrismaClient } from "@prisma/client";
import UserController from "./userController/userController";

const userRouter = express.Router();
const prisma = new PrismaClient();

// add user
userRouter.post("/add", UserController.createUser);

// find user by email address
userRouter.get("/:email", UserController.findUserByEmail);

// find all users
userRouter.get("/", UserController.findAllUsers);

// update user email
userRouter.put("/", UserController.updateUserEmail);

// delete user
userRouter.delete(`/`, UserController.deleteUser);

export { userRouter };
