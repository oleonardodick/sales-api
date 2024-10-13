/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `measurements` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "measurements" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletedAt",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
