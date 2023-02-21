/*
  Warnings:

  - You are about to drop the `Showtime` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Cinema" ADD COLUMN     "showtime" INTEGER[];

-- DropTable
DROP TABLE "Showtime";
