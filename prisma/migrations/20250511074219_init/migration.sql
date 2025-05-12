/*
  Warnings:

  - Made the column `nextPayment` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `nextPayment` DATETIME(3) NOT NULL;
