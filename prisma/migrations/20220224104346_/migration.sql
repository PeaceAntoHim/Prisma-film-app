/*
  Warnings:

  - You are about to alter the column `description` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(3000)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `description` VARCHAR(191) NOT NULL;
