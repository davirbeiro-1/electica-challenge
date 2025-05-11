/*
  Warnings:

  - Changed the type of `transport_type` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "transport_type",
ADD COLUMN     "transport_type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Transport";
