/*
  Warnings:

  - The values [ASSISTANCE_REMINDERS] on the enum `ToiletingSupportLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `centers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_consents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_emergency_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_medical_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `child_parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `children` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consent_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `daily_updates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emergency_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `health_care_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `immunization_records` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `policy_agreements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `policy_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff_signoffs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'SUPERVISOR', 'PARENT', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('TEACHER', 'ASSISTANT', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "ToiletingSupportLevel_new" AS ENUM ('INDEPENDENT', 'ASSISTED', 'FULL_SUPPORT');
ALTER TABLE "ChildMedicalInfo" ALTER COLUMN "toileting" TYPE "ToiletingSupportLevel_new" USING ("toileting"::text::"ToiletingSupportLevel_new");
ALTER TYPE "ToiletingSupportLevel" RENAME TO "ToiletingSupportLevel_old";
ALTER TYPE "ToiletingSupportLevel_new" RENAME TO "ToiletingSupportLevel";
DROP TYPE "ToiletingSupportLevel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "child_attendance" DROP CONSTRAINT "child_attendance_center_id_fkey";

-- DropForeignKey
ALTER TABLE "child_attendance" DROP CONSTRAINT "child_attendance_child_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_center_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_child_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_consent_template_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_parent_signed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_parent_signed_by_parent_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "child_consents" DROP CONSTRAINT "child_consents_supervisor_signed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "child_emergency_contacts" DROP CONSTRAINT "child_emergency_contacts_center_id_fkey";

-- DropForeignKey
ALTER TABLE "child_emergency_contacts" DROP CONSTRAINT "child_emergency_contacts_child_id_fkey";

-- DropForeignKey
ALTER TABLE "child_emergency_contacts" DROP CONSTRAINT "child_emergency_contacts_emergency_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "child_medical_info" DROP CONSTRAINT "child_medical_info_center_id_fkey";

-- DropForeignKey
ALTER TABLE "child_medical_info" DROP CONSTRAINT "child_medical_info_child_id_fkey";

-- DropForeignKey
ALTER TABLE "child_parents" DROP CONSTRAINT "child_parents_center_id_fkey";

-- DropForeignKey
ALTER TABLE "child_parents" DROP CONSTRAINT "child_parents_child_id_fkey";

-- DropForeignKey
ALTER TABLE "child_parents" DROP CONSTRAINT "child_parents_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_center_id_fkey";

-- DropForeignKey
ALTER TABLE "consent_templates" DROP CONSTRAINT "consent_templates_center_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_updates" DROP CONSTRAINT "daily_updates_center_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_updates" DROP CONSTRAINT "daily_updates_child_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_updates" DROP CONSTRAINT "daily_updates_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "emergency_contacts" DROP CONSTRAINT "emergency_contacts_center_id_fkey";

-- DropForeignKey
ALTER TABLE "health_care_providers" DROP CONSTRAINT "health_care_providers_center_id_fkey";

-- DropForeignKey
ALTER TABLE "health_care_providers" DROP CONSTRAINT "health_care_providers_child_id_fkey";

-- DropForeignKey
ALTER TABLE "immunization_records" DROP CONSTRAINT "immunization_records_center_id_fkey";

-- DropForeignKey
ALTER TABLE "immunization_records" DROP CONSTRAINT "immunization_records_child_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "parents" DROP CONSTRAINT "parents_center_id_fkey";

-- DropForeignKey
ALTER TABLE "parents" DROP CONSTRAINT "parents_user_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_agreements" DROP CONSTRAINT "policy_agreements_center_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_agreements" DROP CONSTRAINT "policy_agreements_child_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_agreements" DROP CONSTRAINT "policy_agreements_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_agreements" DROP CONSTRAINT "policy_agreements_policy_template_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_templates" DROP CONSTRAINT "policy_templates_center_id_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_center_id_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_user_id_fkey";

-- DropForeignKey
ALTER TABLE "staff_signoffs" DROP CONSTRAINT "staff_signoffs_center_id_fkey";

-- DropForeignKey
ALTER TABLE "staff_signoffs" DROP CONSTRAINT "staff_signoffs_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_center_id_fkey";

-- DropTable
DROP TABLE "centers";

-- DropTable
DROP TABLE "child_attendance";

-- DropTable
DROP TABLE "child_consents";

-- DropTable
DROP TABLE "child_emergency_contacts";

-- DropTable
DROP TABLE "child_medical_info";

-- DropTable
DROP TABLE "child_parents";

-- DropTable
DROP TABLE "children";

-- DropTable
DROP TABLE "consent_templates";

-- DropTable
DROP TABLE "daily_updates";

-- DropTable
DROP TABLE "emergency_contacts";

-- DropTable
DROP TABLE "health_care_providers";

-- DropTable
DROP TABLE "immunization_records";

-- DropTable
DROP TABLE "jobs";

-- DropTable
DROP TABLE "parents";

-- DropTable
DROP TABLE "policy_agreements";

-- DropTable
DROP TABLE "policy_templates";

-- DropTable
DROP TABLE "staff";

-- DropTable
DROP TABLE "staff_signoffs";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "ConsentType";

-- DropEnum
DROP TYPE "PhotoConsentScope";

-- DropEnum
DROP TYPE "PolicyType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Center" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,

    CONSTRAINT "Center_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "alternatePhoneNumber" TEXT,
    "employer" TEXT,
    "centerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "cprDate" TIMESTAMP(3),
    "eceDate" TIMESTAMP(3),
    "tbDate" TIMESTAMP(3),
    "policeCheckDate" TIMESTAMP(3),
    "offenseDeclarationDate" TIMESTAMP(3),
    "centerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "preferredName" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "sex" "ChildSex" NOT NULL,
    "centerId" TEXT NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildMedicalInfo" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "immunizationRecordUrl" TEXT,
    "immunizationExemption" "ImmunizationExemptionType",
    "communicableDiseases" TEXT,
    "medicalNeeds" TEXT,
    "medicalDevices" TEXT,
    "medicalDeviceInstructions" TEXT,
    "allergies" JSONB,
    "lifeThreateningAllergies" JSONB,
    "dietaryReq" JSONB,
    "isInDiapers" BOOLEAN NOT NULL,
    "toileting" "ToiletingSupportLevel" NOT NULL,

    CONSTRAINT "ChildMedicalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildConsent" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "photoConsent" BOOLEAN NOT NULL,
    "sunscreenConsent" BOOLEAN NOT NULL,
    "lotionConsent" BOOLEAN NOT NULL,
    "lipBalmConsent" BOOLEAN NOT NULL,
    "diaperRashCreamConsent" BOOLEAN NOT NULL,
    "handSanitizerConsent" BOOLEAN NOT NULL,
    "nonPrescriptionMedicineConsent" BOOLEAN NOT NULL,

    CONSTRAINT "ChildConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPresent" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "stripeId" TEXT,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChildToParent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChildToParent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChildMedicalInfo_childId_key" ON "ChildMedicalInfo"("childId");

-- CreateIndex
CREATE INDEX "_ChildToParent_B_index" ON "_ChildToParent"("B");

-- AddForeignKey
ALTER TABLE "Center" ADD CONSTRAINT "Center_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildMedicalInfo" ADD CONSTRAINT "ChildMedicalInfo_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildMedicalInfo" ADD CONSTRAINT "ChildMedicalInfo_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildConsent" ADD CONSTRAINT "ChildConsent_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildConsent" ADD CONSTRAINT "ChildConsent_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildToParent" ADD CONSTRAINT "_ChildToParent_A_fkey" FOREIGN KEY ("A") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildToParent" ADD CONSTRAINT "_ChildToParent_B_fkey" FOREIGN KEY ("B") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
