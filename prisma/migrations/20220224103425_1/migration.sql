/*
  Warnings:

  - You are about to alter the column `description` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1901)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `description` VARCHAR(3000) NOT NULL;
