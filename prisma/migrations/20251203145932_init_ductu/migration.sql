-- CreateEnum
CREATE TYPE "public"."InstitutionStatus" AS ENUM ('draft', 'active', 'suspended');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMINISTRATIVE', 'TEACHER', 'STUDENT');

-- CreateTable
CREATE TABLE "public"."Institution" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "domainSlug" TEXT,
    "contactEmail" TEXT,
    "status" "public"."InstitutionStatus" NOT NULL DEFAULT 'draft',
    "trialEndsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppUser" (
    "id" UUID NOT NULL,
    "authUserId" TEXT NOT NULL,
    "fullName" TEXT,
    "role" "public"."UserRole" NOT NULL,
    "institutionId" UUID,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_domainSlug_key" ON "public"."Institution"("domainSlug");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_authUserId_key" ON "public"."AppUser"("authUserId");

-- AddForeignKey
ALTER TABLE "public"."AppUser" ADD CONSTRAINT "AppUser_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
