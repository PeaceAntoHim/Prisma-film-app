/*
  Warnings:

  - Added the required column `pictures` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `pictures` JSON NOT NULL;
