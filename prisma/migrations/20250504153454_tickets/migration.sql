-- CreateEnum
CREATE TYPE "Transport" AS ENUM ('PLANE', 'BUS', 'TAXI', 'AIRPLANE');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "departure" TEXT,
    "seat" TEXT,
    "details" TEXT,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "transport_type" "Transport" NOT NULL,
    "transport_number" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arriveTime" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_key" ON "Ticket"("number");
