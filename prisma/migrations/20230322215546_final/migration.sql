/*
  Warnings:

  - You are about to drop the column `cinema` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cinemaId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showtime` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studio` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_showtimeId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_transactionId_fkey";

-- AlterTable
ALTER TABLE "Cinema" ADD COLUMN     "admins" TEXT[];

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "regionAdmins" TEXT[];

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cinema",
ADD COLUMN     "cinemaId" INTEGER NOT NULL,
ADD COLUMN     "movieId" INTEGER NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL,
ADD COLUMN     "showtime" BIGINT NOT NULL,
ADD COLUMN     "studio" INTEGER NOT NULL,
ADD COLUMN     "ticketIds" TEXT[],
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "transactions";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "SeatsDates" (
    "id" SERIAL NOT NULL,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "SeatsDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seats" (
    "id" SERIAL NOT NULL,
    "showtimeId" INTEGER NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "seatsTaken" INTEGER[],
    "seatsDateId" INTEGER NOT NULL,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeatsDates_date_key" ON "SeatsDates"("date");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_seatsDateId_fkey" FOREIGN KEY ("seatsDateId") REFERENCES "SeatsDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
