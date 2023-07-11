import { prisma } from "lib/prisma";

export default async function cinemaAdminHandler(req, res) {
  const { adminId } = req.query;
  if (req.method === "PATCH") {
    const { name, username, password } = req.body;
    try {
      await prisma.admin.update({
        where: { id: parseInt(adminId) },
        data: { username, name, password },
      });
      res.status(200).json({ code: 200, message: "Succesfully updated admin" });
    } catch (error) {
      res.status(400).json({ code: 400, error });
    }
  }
}
