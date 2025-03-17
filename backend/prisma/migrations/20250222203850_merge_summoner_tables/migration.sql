/*
  Warnings:

  - You are about to drop the `SummonerDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[summoner_name,summoner_tag,platform]` on the table `SummonerId` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner_level` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner_profile_icon` to the `SummonerId` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SummonerDetails" DROP CONSTRAINT "SummonerDetails_puuid_fkey";

-- DropIndex
DROP INDEX "SummonerId_summoner_name_summoner_tag_key";

-- AlterTable
ALTER TABLE "SummonerId" ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "summoner_level" INTEGER NOT NULL,
ADD COLUMN     "summoner_profile_icon" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SummonerDetails";

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_summoner_name_summoner_tag_platform_key" ON "SummonerId"("summoner_name", "summoner_tag", "platform");
