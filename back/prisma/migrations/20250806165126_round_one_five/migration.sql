/*
  Warnings:

  - You are about to drop the column `centerId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `childId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `isPresent` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Center` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Center` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `preferredName` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `childId` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `diaperRashCreamConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `handSanitizerConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `lipBalmConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `lotionConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `nonPrescriptionMedicineConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `photoConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `sunscreenConsent` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ChildConsent` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `childId` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `communicableDiseases` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryReq` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `immunizationExemption` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `immunizationRecordUrl` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isInDiapers` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `lifeThreateningAllergies` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `medicalDeviceInstructions` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `medicalDevices` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `medicalNeeds` on the `ChildMedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `childId` on the `EmergencyContact` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `EmergencyContact` table. All the data in the column will be lost.
  - You are about to drop the column `alternatePhoneNumber` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `cprDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `eceDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `offenseDeclarationDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `policeCheckDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `tbDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[child_id]` on the table `ChildMedicalInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `center_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_present` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_id` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor_id` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diaper_rash_cream_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hand_sanitizer_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lip_balm_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lotion_Consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `non_prescription_medicine_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunscreen_consent` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ChildConsent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `ChildMedicalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `ChildMedicalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_in_diapers` to the `ChildMedicalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_centerId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_childId_fkey";

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_centerId_fkey";

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Center" DROP CONSTRAINT "Center_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_centerId_fkey";

-- DropForeignKey
ALTER TABLE "ChildConsent" DROP CONSTRAINT "ChildConsent_centerId_fkey";

-- DropForeignKey
ALTER TABLE "ChildConsent" DROP CONSTRAINT "ChildConsent_childId_fkey";

-- DropForeignKey
ALTER TABLE "ChildMedicalInfo" DROP CONSTRAINT "ChildMedicalInfo_centerId_fkey";

-- DropForeignKey
ALTER TABLE "ChildMedicalInfo" DROP CONSTRAINT "ChildMedicalInfo_childId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_childId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_centerId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_centerId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropIndex
DROP INDEX "ChildMedicalInfo_childId_key";

-- DropIndex
DROP INDEX "Parent_userId_key";

-- DropIndex
DROP INDEX "Staff_userId_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "centerId",
DROP COLUMN "childId",
DROP COLUMN "isPresent",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "child_id" TEXT NOT NULL,
ADD COLUMN     "is_present" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "centerId",
DROP COLUMN "dueDate",
DROP COLUMN "parentId",
DROP COLUMN "stripeId",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parent_id" TEXT NOT NULL,
ADD COLUMN     "stripe_id" TEXT;

-- AlterTable
ALTER TABLE "Center" DROP COLUMN "phoneNumber",
DROP COLUMN "supervisorId",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "supervisor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "centerId",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "preferredName",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "preferred_name" TEXT;

-- AlterTable
ALTER TABLE "ChildConsent" DROP COLUMN "centerId",
DROP COLUMN "childId",
DROP COLUMN "diaperRashCreamConsent",
DROP COLUMN "handSanitizerConsent",
DROP COLUMN "lipBalmConsent",
DROP COLUMN "lotionConsent",
DROP COLUMN "nonPrescriptionMedicineConsent",
DROP COLUMN "photoConsent",
DROP COLUMN "sunscreenConsent",
DROP COLUMN "updatedAt",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "child_id" TEXT NOT NULL,
ADD COLUMN     "diaper_rash_cream_consent" BOOLEAN NOT NULL,
ADD COLUMN     "hand_sanitizer_consent" BOOLEAN NOT NULL,
ADD COLUMN     "lip_balm_consent" BOOLEAN NOT NULL,
ADD COLUMN     "lotion_Consent" BOOLEAN NOT NULL,
ADD COLUMN     "non_prescription_medicine_consent" BOOLEAN NOT NULL,
ADD COLUMN     "photo_consent" BOOLEAN NOT NULL,
ADD COLUMN     "sunscreen_consent" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ChildMedicalInfo" DROP COLUMN "centerId",
DROP COLUMN "childId",
DROP COLUMN "communicableDiseases",
DROP COLUMN "dietaryReq",
DROP COLUMN "immunizationExemption",
DROP COLUMN "immunizationRecordUrl",
DROP COLUMN "isInDiapers",
DROP COLUMN "lifeThreateningAllergies",
DROP COLUMN "medicalDeviceInstructions",
DROP COLUMN "medicalDevices",
DROP COLUMN "medicalNeeds",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "child_id" TEXT NOT NULL,
ADD COLUMN     "communicable_diseases" TEXT,
ADD COLUMN     "dietary_req" JSONB,
ADD COLUMN     "immunization_exemption" "ImmunizationExemptionType",
ADD COLUMN     "immunization_record_url" TEXT,
ADD COLUMN     "is_in_diapers" BOOLEAN NOT NULL,
ADD COLUMN     "life_threatening_allergies" JSONB,
ADD COLUMN     "medical_device_instructions" TEXT,
ADD COLUMN     "medical_devices" TEXT,
ADD COLUMN     "medical_needs" TEXT;

-- AlterTable
ALTER TABLE "EmergencyContact" DROP COLUMN "childId",
DROP COLUMN "phoneNumber",
ADD COLUMN     "child_id" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "alternatePhoneNumber",
DROP COLUMN "centerId",
DROP COLUMN "phoneNumber",
DROP COLUMN "userId",
ADD COLUMN     "alt_phone_number" TEXT,
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "centerId",
DROP COLUMN "cprDate",
DROP COLUMN "eceDate",
DROP COLUMN "offenseDeclarationDate",
DROP COLUMN "phoneNumber",
DROP COLUMN "policeCheckDate",
DROP COLUMN "tbDate",
DROP COLUMN "userId",
ADD COLUMN     "center_id" TEXT NOT NULL,
ADD COLUMN     "cpr_date" TIMESTAMP(3),
ADD COLUMN     "ece_date" TIMESTAMP(3),
ADD COLUMN     "offense_declaration_date" TIMESTAMP(3),
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "police_check_date" TIMESTAMP(3),
ADD COLUMN     "tb_date" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ChildMedicalInfo_child_id_key" ON "ChildMedicalInfo"("child_id");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_user_id_key" ON "Parent"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_user_id_key" ON "Staff"("user_id");

-- AddForeignKey
ALTER TABLE "Center" ADD CONSTRAINT "Center_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildMedicalInfo" ADD CONSTRAINT "ChildMedicalInfo_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildMedicalInfo" ADD CONSTRAINT "ChildMedicalInfo_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildConsent" ADD CONSTRAINT "ChildConsent_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildConsent" ADD CONSTRAINT "ChildConsent_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
