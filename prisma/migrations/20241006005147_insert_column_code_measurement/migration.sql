/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `measurements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `measurements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "measurements" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "measurements_code_key" ON "measurements"("code");
