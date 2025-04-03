import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // 🔹 Verifică autentificarea și extrage userId din token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Acces interzis! Token lipsă." });
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, "secrettoken123"); // Asigură-te că secretul este corect
  } catch (error) {
    return res.status(403).json({ error: "Token invalid sau expirat." });
  }

  if (req.method === "PUT") {
    try {
      const { name, dueDate } = req.body;

      // 🔹 Verifică dacă task-ul există
      const existingTask = await prisma.task.findUnique({
        where: { id: Number(id) },
      });

      if (!existingTask) {
        return res.status(404).json({ error: "Taskul nu a fost găsit." });
      }

      // 🔹 Verifică dacă utilizatorul autentificat este proprietarul taskului
      if (existingTask.userId !== decoded.userId) {
        return res.status(403).json({ error: "Nu ai permisiunea de a edita acest task." });
      }

      // 🔹 Actualizează task-ul doar dacă aparține utilizatorului conectat
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { name, dueDate },
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ error: "Eroare la actualizarea taskului" });
    }
  } 

  // 🔹 Returnează 405 dacă metoda nu este acceptată
  return res.status(405).json({ error: "Metodă neacceptată" });
}