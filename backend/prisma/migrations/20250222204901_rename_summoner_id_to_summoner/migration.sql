/*
  Warnings:

  - You are about to drop the `SummonerId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_puuid_fkey";

-- DropForeignKey
ALTER TABLE "SummonerMastery" DROP CONSTRAINT "SummonerMastery_puuid_fkey";

-- DropForeignKey
ALTER TABLE "SummonerRank" DROP CONSTRAINT "SummonerRank_summoner_id_fkey";

-- DropTable
DROP TABLE "SummonerId";

-- CreateTable
CREATE TABLE "Summoner" (
    "puuid" TEXT NOT NULL,
    "summoner_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "summoner_name" TEXT NOT NULL,
    "summoner_tag" TEXT NOT NULL,
    "summoner_level" INTEGER NOT NULL,
    "summoner_profile_icon" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("puuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_puuid_key" ON "Summoner"("puuid");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_summoner_id_key" ON "Summoner"("summoner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_account_id_key" ON "Summoner"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_summoner_name_summoner_tag_platform_key" ON "Summoner"("summoner_name", "summoner_tag", "platform");

-- AddForeignKey
ALTER TABLE "SummonerMastery" ADD CONSTRAINT "SummonerMastery_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "Summoner"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummonerRank" ADD CONSTRAINT "SummonerRank_summoner_id_fkey" FOREIGN KEY ("summoner_id") REFERENCES "Summoner"("summoner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "Summoner"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;
