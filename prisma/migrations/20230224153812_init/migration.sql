-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "regionId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "synopsis" SET DEFAULT null,
ALTER COLUMN "title" SET DEFAULT null,
ALTER COLUMN "watchedAmount" SET DEFAULT null;

-- AlterTable
ALTER TABLE "Studio" ALTER COLUMN "capacity" SET DEFAULT null;
