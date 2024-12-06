
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, complete } = req.body;

  if (typeof id !== "string" || typeof complete !== "boolean") {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  try {
    await prisma.todo.update({
      where: { id },
      data: { complete },
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update todo" });
  }
}
