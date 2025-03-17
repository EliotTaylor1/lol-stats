/*
  Warnings:

  - The primary key for the `Champions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `champion_name` on the `Champions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[champion_id,champion_key]` on the table `Champions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `champion_key` to the `Champions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Champions_champion_id_champion_name_key";

-- AlterTable
ALTER TABLE "Champions" DROP CONSTRAINT "Champions_pkey",
DROP COLUMN "champion_name",
ADD COLUMN     "champion_key" INTEGER NOT NULL,
ALTER COLUMN "champion_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Champions_pkey" PRIMARY KEY ("champion_id", "champion_key");

-- CreateIndex
CREATE UNIQUE INDEX "Champions_champion_id_champion_key_key" ON "Champions"("champion_id", "champion_key");
