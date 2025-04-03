import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Eroare la obținerea taskurilor" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, dueDate, userId, listId } = req.body;
      if (!name || !dueDate || !userId || !listId) {
        return res.status(400).json({ error: "Toate câmpurile sunt necesare" });
      }
      const newTask = await prisma.task.create({
        data: {
          name,
          dueDate: new Date(dueDate),
          user: { connect: { id: userId } },
          list: { connect: { id: listId } },
        },
      });
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ error: "Eroare la crearea taskului" });
    }
  }

  return res.status(405).json({ error: "Metodă neacceptată" });
}