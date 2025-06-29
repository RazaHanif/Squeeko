-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BIG_BOSS', 'CENTER_SUPERVISOR', 'STAFF', 'PARENT');

-- CreateEnum
CREATE TYPE "ChildSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ImmunizationExemptionType" AS ENUM ('MEDICAL', 'RELIGIOUS', 'CONSCIENCE');

-- CreateEnum
CREATE TYPE "ToiletingSupportLevel" AS ENUM ('INDEPENDENT', 'ASSISTANCE_REMINDERS', 'FULL_SUPPORT');

-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('FIELD_TRIP', 'PHOTOGRAPHY', 'NON_PRESCRIPTION_MEDS', 'EMERGENCY_MEDICAL_TREATMENT', 'RELEASE_OF_INFORMATION');

-- CreateEnum
CREATE TYPE "PhotoConsentScope" AS ENUM ('CENTRE_USE_ONLY', 'ADVERTISING', 'SOCIAL_MEDIA', 'NEWSLETTER', 'WEBSITE');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('REGISTRATION_FEE', 'EMERGENCY_TREATMENT', 'MEDICAL_SURGICAL_TREATMENT', 'PARENT_HANDBOOK', 'PRIVACY_POLICY', 'CODE_OF_CONDUCT');

-- CreateTable
CREATE TABLE "centers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "supervisor_name" TEXT,
    "registration_fee" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "late_payment_fee_per_week" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "center_id" UUID,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PARENT',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMPTZ(6),
    "usage_quota_minutes" INTEGER NOT NULL DEFAULT 60,
    "usage_consumed_minutes" INTEGER NOT NULL DEFAULT 0,
    "usage_quota_summaries" INTEGER NOT NULL DEFAULT 5,
    "usage_consumed_summaries" INTEGER NOT NULL DEFAULT 0,
    "stripe_customer_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parents" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "user_id" UUID,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "relationship_to_child" TEXT NOT NULL,
    "address" TEXT,
    "phone_number" TEXT,
    "email_address" TEXT,
    "employer" TEXT,
    "work_number" TEXT,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "preferred_name" TEXT,
    "date_of_birth" DATE NOT NULL,
    "sex" "ChildSex",
    "home_address" TEXT NOT NULL,
    "languages_spoken_at_home" TEXT[],
    "custodial_parent_names" TEXT,
    "prohibited_access_names" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_parents" (
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "relationship_to_child" TEXT NOT NULL,

    CONSTRAINT "child_parents_pkey" PRIMARY KEY ("child_id","parent_id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone_number" TEXT NOT NULL,
    "relation_to_child" TEXT NOT NULL,
    "authorized_to_pick_up" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_emergency_contacts" (
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "emergency_contact_id" UUID NOT NULL,

    CONSTRAINT "child_emergency_contacts_pkey" PRIMARY KEY ("child_id","emergency_contact_id")
);

-- CreateTable
CREATE TABLE "child_medical_info" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "additional_emergency_info" TEXT,
    "immunization_record_url" TEXT,
    "immunization_exemption" "ImmunizationExemptionType",
    "has_communicable_diseases" BOOLEAN NOT NULL DEFAULT false,
    "communicable_diseases_list" TEXT,
    "has_medical_need" BOOLEAN NOT NULL DEFAULT false,
    "medical_need_details" TEXT,
    "uses_medical_devices" BOOLEAN NOT NULL DEFAULT false,
    "medical_device_instructions" TEXT,
    "has_life_threatening_allergy" BOOLEAN NOT NULL DEFAULT false,
    "life_threatening_allergy_details" TEXT,
    "has_other_allergies" BOOLEAN NOT NULL DEFAULT false,
    "other_allergy_details" TEXT,
    "has_special_dietary_reqs" BOOLEAN NOT NULL DEFAULT false,
    "dietary_requirements_details" TEXT,
    "is_in_diapers" BOOLEAN NOT NULL DEFAULT false,
    "toileting_support_level" "ToiletingSupportLevel",
    "additional_care_info" TEXT,

    CONSTRAINT "child_medical_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_care_providers" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "physician_name" TEXT NOT NULL,
    "physician_address" TEXT NOT NULL,
    "physician_phone_number" TEXT NOT NULL,
    "childs_health_card_number" TEXT,

    CONSTRAINT "health_care_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "immunization_records" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "record_url" TEXT NOT NULL,
    "date_uploaded" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "immunization_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_attendance" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "is_present" BOOLEAN NOT NULL DEFAULT true,
    "check_in_time" TIMESTAMPTZ(6),
    "check_out_time" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "child_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_templates" (
    "id" UUID NOT NULL,
    "center_id" UUID,
    "type" "ConsentType" NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consent_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_consents" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "consent_template_id" UUID NOT NULL,
    "parent_consent_given" BOOLEAN NOT NULL,
    "parent_signature" TEXT,
    "parent_signed_at" TIMESTAMPTZ(6) NOT NULL,
    "parent_signed_by_id" UUID,
    "parent_signed_by_parent_profile_id" UUID,
    "supervisor_consent_given" BOOLEAN,
    "supervisor_signature" TEXT,
    "supervisor_signed_at" TIMESTAMPTZ(6),
    "supervisor_signed_by_id" UUID,
    "photo_consent_scopes" "PhotoConsentScope"[],
    "parent_full_name" TEXT,
    "centre_supervisor_name" TEXT,
    "sunscreen_consent" BOOLEAN,
    "lotion_consent" BOOLEAN,
    "lip_balm_consent" BOOLEAN,
    "vaseline_consent" BOOLEAN,
    "diaper_rash_cream_consent" BOOLEAN,
    "hand_sanitizer_consent" BOOLEAN,
    "other_non_prescription_med" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "child_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy_templates" (
    "id" UUID NOT NULL,
    "center_id" UUID,
    "type" "PolicyType" NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy_agreements" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "policy_template_id" UUID NOT NULL,
    "parent_acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "parent_signature" TEXT,
    "parent_signed_at" TIMESTAMPTZ(6) NOT NULL,
    "parent_signed_by_full_name" TEXT,
    "child_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "user_id" UUID,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "cpr_renewal_date" DATE,
    "ece_license_expiry_date" DATE,
    "tb_test_date" DATE,
    "vaccines_list" JSONB,
    "police_record_check_date" DATE,
    "offense_declaration_date" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_signoffs" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "staff_id" UUID NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_id" UUID,
    "signoff_reason" TEXT,
    "signature" TEXT,
    "signed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_signoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_updates" (
    "id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "child_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "staff_id" UUID NOT NULL,
    "mood" TEXT,
    "nap_start_time" TIMESTAMPTZ(6),
    "nap_end_time" TIMESTAMPTZ(6),
    "meals" JSONB,
    "diaperChanges" JSONB,
    "activities" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "centers_name_key" ON "centers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_center_id_email_key" ON "users"("center_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "parents_user_id_key" ON "parents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "parents_center_id_email_address_key" ON "parents"("center_id", "email_address");

-- CreateIndex
CREATE UNIQUE INDEX "children_center_id_first_name_last_name_date_of_birth_key" ON "children"("center_id", "first_name", "last_name", "date_of_birth");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_contacts_center_id_name_phone_number_key" ON "emergency_contacts"("center_id", "name", "phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "child_medical_info_child_id_key" ON "child_medical_info"("child_id");

-- CreateIndex
CREATE UNIQUE INDEX "health_care_providers_child_id_key" ON "health_care_providers"("child_id");

-- CreateIndex
CREATE UNIQUE INDEX "immunization_records_child_id_key" ON "immunization_records"("child_id");

-- CreateIndex
CREATE UNIQUE INDEX "child_attendance_child_id_date_key" ON "child_attendance"("child_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "consent_templates_center_id_type_version_key" ON "consent_templates"("center_id", "type", "version");

-- CreateIndex
CREATE UNIQUE INDEX "child_consents_child_id_consent_template_id_key" ON "child_consents"("child_id", "consent_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "policy_templates_center_id_type_version_key" ON "policy_templates"("center_id", "type", "version");

-- CreateIndex
CREATE UNIQUE INDEX "policy_agreements_parent_id_policy_template_id_child_id_key" ON "policy_agreements"("parent_id", "policy_template_id", "child_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staff_center_id_email_key" ON "staff"("center_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "daily_updates_child_id_date_key" ON "daily_updates"("child_id", "date");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_parents" ADD CONSTRAINT "child_parents_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_parents" ADD CONSTRAINT "child_parents_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_parents" ADD CONSTRAINT "child_parents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_emergency_contacts" ADD CONSTRAINT "child_emergency_contacts_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_emergency_contacts" ADD CONSTRAINT "child_emergency_contacts_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_emergency_contacts" ADD CONSTRAINT "child_emergency_contacts_emergency_contact_id_fkey" FOREIGN KEY ("emergency_contact_id") REFERENCES "emergency_contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_medical_info" ADD CONSTRAINT "child_medical_info_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_medical_info" ADD CONSTRAINT "child_medical_info_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_care_providers" ADD CONSTRAINT "health_care_providers_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_care_providers" ADD CONSTRAINT "health_care_providers_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "immunization_records" ADD CONSTRAINT "immunization_records_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "immunization_records" ADD CONSTRAINT "immunization_records_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_attendance" ADD CONSTRAINT "child_attendance_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_attendance" ADD CONSTRAINT "child_attendance_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent_templates" ADD CONSTRAINT "consent_templates_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_consent_template_id_fkey" FOREIGN KEY ("consent_template_id") REFERENCES "consent_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_parent_signed_by_id_fkey" FOREIGN KEY ("parent_signed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_parent_signed_by_parent_profile_id_fkey" FOREIGN KEY ("parent_signed_by_parent_profile_id") REFERENCES "parents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_consents" ADD CONSTRAINT "child_consents_supervisor_signed_by_id_fkey" FOREIGN KEY ("supervisor_signed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_templates" ADD CONSTRAINT "policy_templates_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_agreements" ADD CONSTRAINT "policy_agreements_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_agreements" ADD CONSTRAINT "policy_agreements_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_agreements" ADD CONSTRAINT "policy_agreements_policy_template_id_fkey" FOREIGN KEY ("policy_template_id") REFERENCES "policy_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_agreements" ADD CONSTRAINT "policy_agreements_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_signoffs" ADD CONSTRAINT "staff_signoffs_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_signoffs" ADD CONSTRAINT "staff_signoffs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_updates" ADD CONSTRAINT "daily_updates_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_updates" ADD CONSTRAINT "daily_updates_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_updates" ADD CONSTRAINT "daily_updates_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
