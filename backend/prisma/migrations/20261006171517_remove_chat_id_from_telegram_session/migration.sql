/*
  Warnings:

  - You are about to drop the column `chatId` on the `TelegramSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TelegramSession" DROP COLUMN "chatId";
