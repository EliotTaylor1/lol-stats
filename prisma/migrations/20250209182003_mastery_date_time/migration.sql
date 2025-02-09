/*
  Warnings:

  - Changed the type of `last_play_time` on the `SummonerMastery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SummonerMastery" DROP COLUMN "last_play_time",
ADD COLUMN     "last_play_time" TIMESTAMP(3) NOT NULL;
