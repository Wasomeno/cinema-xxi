/*
  Warnings:

  - You are about to drop the column `studioId` on the `Showtime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "regionId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "synopsis" SET DEFAULT null,
ALTER COLUMN "title" SET DEFAULT null,
ALTER COLUMN "watchedAmount" SET DEFAULT null;

-- AlterTable
ALTER TABLE "Showtime" DROP COLUMN "studioId",
ADD COLUMN     "showtime" INTEGER;

-- AlterTable
ALTER TABLE "Studio" ALTER COLUMN "capacity" SET DEFAULT null;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
