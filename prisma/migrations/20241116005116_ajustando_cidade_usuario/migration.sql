/*
  Warnings:

  - Made the column `cidadeId` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_cidadeId_fkey";

-- DropIndex
DROP INDEX "usuarios_cidadeId_key";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "cidadeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
