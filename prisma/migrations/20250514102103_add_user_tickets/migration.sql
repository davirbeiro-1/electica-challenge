/*
  Warnings:

  - You are about to drop the column `arriveTime` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `arrive_time` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_time` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "arriveTime",
DROP COLUMN "departureTime",
ADD COLUMN     "arrive_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departure_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;
