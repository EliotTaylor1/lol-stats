/*
  Warnings:

  - Added the required column `queue_id` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "queue_id" INTEGER NOT NULL;
