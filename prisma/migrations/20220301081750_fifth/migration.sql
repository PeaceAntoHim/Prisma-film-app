/*
  Warnings:

  - You are about to alter the column `pictures` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `pictures` JSON NOT NULL;
