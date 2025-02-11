/*
  Warnings:

  - A unique constraint covering the columns `[summoner_name,summoner_tag]` on the table `SummonerId` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `summoner_name` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner_tag` to the `SummonerId` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SummonerId" ADD COLUMN     "summoner_name" TEXT NOT NULL,
ADD COLUMN     "summoner_tag" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SummonerDetails" (
    "id" SERIAL NOT NULL,
    "puuid" TEXT NOT NULL,
    "summoner_level" INTEGER NOT NULL,
    "summoner_profileIcon" INTEGER NOT NULL,

    CONSTRAINT "SummonerDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummonerDetails_puuid_key" ON "SummonerDetails"("puuid");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_summoner_name_summoner_tag_key" ON "SummonerId"("summoner_name", "summoner_tag");

-- AddForeignKey
ALTER TABLE "SummonerDetails" ADD CONSTRAINT "SummonerDetails_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "SummonerId"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;
