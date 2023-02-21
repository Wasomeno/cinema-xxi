-- AlterTable
CREATE SEQUENCE cinema_id_seq;
ALTER TABLE "Cinema" ALTER COLUMN "id" SET DEFAULT nextval('cinema_id_seq');
ALTER SEQUENCE cinema_id_seq OWNED BY "Cinema"."id";

-- AlterTable
CREATE SEQUENCE movie_id_seq;
ALTER TABLE "Movie" ALTER COLUMN "id" SET DEFAULT nextval('movie_id_seq');
ALTER SEQUENCE movie_id_seq OWNED BY "Movie"."id";

-- AlterTable
CREATE SEQUENCE showtime_id_seq;
ALTER TABLE "Showtime" ALTER COLUMN "id" SET DEFAULT nextval('showtime_id_seq');
ALTER SEQUENCE showtime_id_seq OWNED BY "Showtime"."id";

-- AlterTable
CREATE SEQUENCE studio_id_seq;
ALTER TABLE "Studio" ALTER COLUMN "id" SET DEFAULT nextval('studio_id_seq');
ALTER SEQUENCE studio_id_seq OWNED BY "Studio"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
