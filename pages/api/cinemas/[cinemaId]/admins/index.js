import { prisma } from "lib/prisma";

export default async function cinemaAdminsHandler(req, res) {
  const { cinemaId } = req.query;

  if (req.method === "GET") {
    const cinemaAdmins = await prisma.admin.findMany({
      where: { cinemaId: parseInt(cinemaId) },
    });
    res.status(200).json(cinemaAdmins);
  }

  if (req.method === "POST") {
    const { name, username, password } = req.body;
    try {
      await prisma.admin.create({
        data: {
          name,
          username,
          password,
          cinema: { connect: { id: parseInt(cinemaId) } },
        },
      });
      res
        .status(200)
        .json({ code: 200, message: "Succesfully added new admin" });
    } catch (error) {
      res.status(400).json({ code: 400, error });
    }
  }
}
