import { prisma } from "lib/prisma";

export default async function cinemaSearchHandler(req, res) {
  if (req.method === "POST") {
    const { searchTerm } = req.body;
    const getCinemas = async () => {
      if (searchTerm === "") {
        const allCinema = await prisma.cinema.findMany();
        return allCinema;
      } else {
        const searchedCinema = await prisma.cinema.findMany({
          where: { name: { contains: searchTerm, mode: "insensitive" } },
        });
        return searchedCinema;
      }
    };
    const cinemas = await getCinemas();
    res.status(200).json(cinemas);
  }
}
