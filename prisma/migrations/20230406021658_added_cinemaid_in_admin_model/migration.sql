/*
  Warnings:

  - You are about to drop the column `admins` on the `Cinema` table. All the data in the column will be lost.
  - Added the required column `cinemaId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "cinemaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "admins";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
