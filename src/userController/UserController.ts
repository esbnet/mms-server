import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default {
	async createUser(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;
			let user = await prisma.user.findUnique({ where: { email } });

			if (user) {
				return res.json({
					error: "Existe um usuário cadastrado com esse email.",
				});
			}
			user = await prisma.user.create({ data: { email, name, password } });
			return res.json(user);
		} catch (error) {
			console.log(error);
			return res.send("usuário gravado com sucesso");
		}
	},
	async findUserByEmail(req: Request, res: Response) {
		const { email } = req.params;
		const user = await prisma.user.findFirst({
			where: { email: email },
		});
		return res.json(user);
	},

	async findAllUsers(req: Request, res: Response) {
		const user = await prisma.user.findMany();
		return res.json(user);
	},

	async updateUserEmail(req: Request, res: Response) {
		const {id} = req.params;
		const { emailSource, emailDestination } = req.body;
		try {

			let user = await prisma.user.findUnique({ where: { id: Number(id) } });

			if (!user) {
				return res.json({
					error: "Usuário não cadastrado.",
				});
			}
			
			user = await prisma.user.update({
				where: { email: emailSource },
				data: {
					email: emailDestination,
				},
			});
			res.json(user);
		} catch (error) {
			res.json({
				error: `User with email ${emailSource} does not exist in the database`,
			});
		}
	},

	async deleteUser(req: Request, res: Response) {
		const { email } = req.body;
		let user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.json({
				error: "Não existe um usuário cadastrado com esse email.",
			});
		}
		user = await prisma.user.delete({
			where: { email: email },
		});
		res.json(user);
	},
};
