-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "id" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" INTEGER NOT NULL,
    "showtime" INTEGER NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Showtime" (
    "id" INTEGER NOT NULL,
    "showtime" INTEGER NOT NULL,

    CONSTRAINT "Showtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "transactions" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CinemaToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CinemaToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "_CinemaToStudio_AB_unique" ON "_CinemaToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_CinemaToStudio_B_index" ON "_CinemaToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CinemaToMovie_AB_unique" ON "_CinemaToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CinemaToMovie_B_index" ON "_CinemaToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToStudio_AB_unique" ON "_MovieToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToStudio_B_index" ON "_MovieToStudio"("B");

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToStudio" ADD CONSTRAINT "_CinemaToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToStudio" ADD CONSTRAINT "_CinemaToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToMovie" ADD CONSTRAINT "_CinemaToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToMovie" ADD CONSTRAINT "_CinemaToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToStudio" ADD CONSTRAINT "_MovieToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToStudio" ADD CONSTRAINT "_MovieToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
