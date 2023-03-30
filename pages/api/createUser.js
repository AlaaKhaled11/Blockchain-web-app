import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { metamaskId, password } = req.body;
    const user = await prisma.user.create({ data: { metamaskId, password } });
    res.status(200).json({ user });
  }
  res.status(500);
}
