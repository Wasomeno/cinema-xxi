"use server"

import { prisma } from "@/lib/prisma"

export async function getMovie(id: string) {
  const movie = await prisma.movie.findUnique({
    where: { id: id },
    select: { title: true, image_url: true },
  })
  return movie
}
