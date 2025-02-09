/*
  Warnings:

  - Added the required column `platform` to the `SummonerDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `SummonerDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SummonerDetails" ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
