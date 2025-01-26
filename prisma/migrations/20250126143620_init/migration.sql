-- CreateTable
CREATE TABLE "SummonerId" (
    "id" SERIAL NOT NULL,
    "puuid" TEXT NOT NULL,
    "summoner_Id" TEXT NOT NULL,
    "account_Id" TEXT NOT NULL,

    CONSTRAINT "SummonerId_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_puuid_key" ON "SummonerId"("puuid");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_summoner_Id_key" ON "SummonerId"("summoner_Id");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_account_Id_key" ON "SummonerId"("account_Id");
