/*
  Warnings:

  - You are about to drop the column `summoner_profileIcon` on the `SummonerDetails` table. All the data in the column will be lost.
  - You are about to drop the column `lastPlay_time` on the `SummonerMastery` table. All the data in the column will be lost.
  - Added the required column `summoner_profile_icon` to the `SummonerDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_play_time` to the `SummonerMastery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SummonerDetails" DROP COLUMN "summoner_profileIcon",
ADD COLUMN     "summoner_profile_icon" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SummonerMastery" DROP COLUMN "lastPlay_time",
ADD COLUMN     "last_play_time" BIGINT NOT NULL;
