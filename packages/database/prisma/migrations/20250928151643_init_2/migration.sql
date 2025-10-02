-- CreateEnum
CREATE TYPE "public"."Vediostatus" AS ENUM ('QUEUED', 'RENDERING', 'TRANSCODING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vedio" (
    "id" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "storageUrl" TEXT,
    "status" "public"."Vediostatus" NOT NULL DEFAULT 'QUEUED',

    CONSTRAINT "vedio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vedio" ADD CONSTRAINT "vedio_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
