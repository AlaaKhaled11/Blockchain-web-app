import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { metamaskId, password } = req.query;
  const user = await prisma.user.findFirst({ where: { metamaskId, password } });
  res.status(200).json({ user });
}
