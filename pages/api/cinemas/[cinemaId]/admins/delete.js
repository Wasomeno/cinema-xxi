import { prisma } from "lib/prisma";

export default async function deleteCinemaAdminsHandler(req, res) {
  if (req.method === "POST") {
    const { adminIds } = req.body;
    try {
      await prisma.admin.deleteMany({ where: { id: { in: adminIds } } });
      res
        .status(200)
        .json({ code: 200, message: "Succesfully deleted admins" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
