-- CreateTable
CREATE TABLE "SummonerRank" (
    "summoner_id" TEXT NOT NULL,
    "queue_type" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SummonerRank_summoner_id_queue_type_key" ON "SummonerRank"("summoner_id", "queue_type");

-- AddForeignKey
ALTER TABLE "SummonerRank" ADD CONSTRAINT "SummonerRank_summoner_id_fkey" FOREIGN KEY ("summoner_id") REFERENCES "SummonerId"("summoner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
