-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "positions" TEXT[],
    "species" TEXT[],
    "resource" TEXT NOT NULL,
    "rangeType" TEXT NOT NULL,
    "region" TEXT[],
    "releaseYear" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);
