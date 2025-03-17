-- CreateTable
CREATE TABLE "Champions" (
    "champion_id" INTEGER NOT NULL,
    "champion_name" TEXT NOT NULL,

    CONSTRAINT "Champions_pkey" PRIMARY KEY ("champion_id","champion_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Champions_champion_id_champion_name_key" ON "Champions"("champion_id", "champion_name");
