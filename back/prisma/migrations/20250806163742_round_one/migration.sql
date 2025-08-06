-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'SUPERVISOR', 'PARENT', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('TEACHER', 'ASSISTANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ChildSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ImmunizationExemptionType" AS ENUM ('MEDICAL', 'RELIGIOUS', 'CONSCIENCE');

-- CreateEnum
CREATE TYPE "ToiletingSupportLevel" AS ENUM ('INDEPENDENT', 'ASSISTED', 'FULL_SUPPORT');

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
