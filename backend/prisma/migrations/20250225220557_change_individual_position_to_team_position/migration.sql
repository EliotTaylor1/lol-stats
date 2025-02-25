/*
  Warnings:

  - You are about to drop the column `individual_position` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `team_position` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "individual_position",
ADD COLUMN     "team_position" TEXT NOT NULL;
