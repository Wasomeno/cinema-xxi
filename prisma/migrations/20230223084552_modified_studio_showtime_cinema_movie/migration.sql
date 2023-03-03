/*
  Warnings:

  - You are about to drop the column `showtime` on the `Cinema` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `showtime` on the `Studio` table. All the data in the column will be lost.
  - You are about to drop the `_MovieToStudio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieToStudio" DROP CONSTRAINT "_MovieToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToStudio" DROP CONSTRAINT "_MovieToStudio_B_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "regionId" INTEGER NOT NULL DEFAULT null;

-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "showtime";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "name",
ADD COLUMN     "casts" VARCHAR(255)[],
ADD COLUMN     "synopsis" TEXT NOT NULL DEFAULT null,
ADD COLUMN     "title" VARCHAR(255) NOT NULL DEFAULT null,
ADD COLUMN     "watchedAmount" INTEGER NOT NULL DEFAULT null;

-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "showtime",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT null;

-- DropTable
DROP TABLE "_MovieToStudio";

-- CreateTable
CREATE TABLE "Showtime" (
    "id" SERIAL NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "studioId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Showtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShowtimeToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShowtimeToStudio_AB_unique" ON "_ShowtimeToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowtimeToStudio_B_index" ON "_ShowtimeToStudio"("B");

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowtimeToStudio" ADD CONSTRAINT "_ShowtimeToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Showtime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowtimeToStudio" ADD CONSTRAINT "_ShowtimeToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
