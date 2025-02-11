/*
  Warnings:

  - The primary key for the `SummonerDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SummonerDetails` table. All the data in the column will be lost.
  - The primary key for the `SummonerId` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SummonerId` table. All the data in the column will be lost.
  - The primary key for the `SummonerMastery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SummonerMastery` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `SummonerDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SummonerMastery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SummonerRank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SummonerDetails" DROP CONSTRAINT "SummonerDetails_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SummonerDetails_pkey" PRIMARY KEY ("puuid");

-- AlterTable
ALTER TABLE "SummonerId" DROP CONSTRAINT "SummonerId_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SummonerId_pkey" PRIMARY KEY ("puuid");

-- AlterTable
ALTER TABLE "SummonerMastery" DROP CONSTRAINT "SummonerMastery_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SummonerMastery_pkey" PRIMARY KEY ("puuid", "champion_id");

-- AlterTable
ALTER TABLE "SummonerRank" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "SummonerRank_pkey" PRIMARY KEY ("summoner_id", "queue_type");
