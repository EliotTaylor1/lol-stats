/*
  Warnings:

  - Added the required column `champion_name` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "champion_name" TEXT NOT NULL;
