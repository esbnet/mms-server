import express from "express";
import { PrismaClient } from "@prisma/client";
import UserController from "./userController/userController";

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get("/:id", UserController.findUserById);
userRouter.get("/email/:email", UserController.findUserByEmail);
userRouter.get("/", UserController.findAllUsers);
userRouter.post("/add", UserController.createUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete(`/:id`, UserController.deleteUser);

export { userRouter };
