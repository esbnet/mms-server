import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default {
  async findUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (user) return res.json(user);
      res.json({
        warning: `Não foi encontratdo usuário com o id: ${id}`,
      });
    } catch (error) {
      res.json({
        error: `Não foi encontratdo usuário com o id: ${id}`,
      });
    }
  },

  async findUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      if (user) return res.json(user);
      res.json({
        warning: `Não foi encontratdo usuário com o email: ${email}`,
      });
    } catch (error) {
      res.json({
        error: `Não foi encontrado usuário com email: ${email}`,
      });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      let user = await prisma.user.findUnique({ where: { email: email } });
      if (user !== null) {
        return res.status(200).json({
          warning: "Existe um usuário cadastrado com esse email.",
        });
      }
      user = await prisma.user.create({ data: { email, name, password } });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(200).send({ error: error });
    }
  },

  async findAllUsers(req: Request, res: Response) {
    const user = await prisma.user.findMany();
    return res.json(user);
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({
			warning: "Usuário não cadastrado.",
        });
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, password },
      });
      res.json(user);
    } catch (error) {
      res.json({
        error: `User with id ${id} does not exist in the database`,
      });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    let user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.json({
        warning: `Não existe um usuário cadastrado com o id ${id}.`,
      });
    }
    user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.json({
      message: `Usuário com id ${id} foi deletado permanentemente.`,
    });
  },
};
