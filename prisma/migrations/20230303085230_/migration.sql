/*
  Warnings:

  - You are about to drop the column `showtime` on the `Showtime` table. All the data in the column will be lost.
  - You are about to drop the `_ShowtimeToStudio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `time` to the `Showtime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "_ShowtimeToStudio" DROP CONSTRAINT "_ShowtimeToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShowtimeToStudio" DROP CONSTRAINT "_ShowtimeToStudio_B_fkey";

-- AlterTable
ALTER TABLE "Showtime" DROP COLUMN "showtime",
ADD COLUMN     "studioId" INTEGER,
ADD COLUMN     "time" INTEGER NOT NULL,
ALTER COLUMN "movieId" DROP NOT NULL;

-- DropTable
DROP TABLE "_ShowtimeToStudio";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "cinema" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "showtimeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
