/*
  Warnings:

  - You are about to drop the `_CinemaToStudio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cinemaId` to the `Studio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studio` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CinemaToStudio" DROP CONSTRAINT "_CinemaToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_CinemaToStudio" DROP CONSTRAINT "_CinemaToStudio_B_fkey";

-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "cinemaId" INTEGER NOT NULL,
ADD COLUMN     "studio" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CinemaToStudio";

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
