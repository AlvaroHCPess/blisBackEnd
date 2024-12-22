import { Request, Response } from 'express';
import { prisma } from '../prismaClient'; // Importando a instância do Prisma
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response) => {
  const { name, birthdate, email, password } = req.body;

  // Verifique se o email já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Email já cadastrado.' });
  }

  // Criptografe a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crie o usuário
  const user = await prisma.user.create({
    data: { name, birthdate, email, password: hashedPassword },
  });

  return res.status(201).json(user);
};
