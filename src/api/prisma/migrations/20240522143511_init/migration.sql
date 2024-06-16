-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization_project" (
    "organization_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Organization_project_pkey" PRIMARY KEY ("organization_id","project_id")
);

-- CreateTable
CREATE TABLE "Project_environment" (
    "environment_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Project_environment_pkey" PRIMARY KEY ("environment_id","project_id")
);

-- CreateTable
CREATE TABLE "User_permission" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "User_permission_pkey" PRIMARY KEY ("user_id","role_id","project_id")
);

-- AddForeignKey
ALTER TABLE "Organization_project" ADD CONSTRAINT "Organization_project_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization_project" ADD CONSTRAINT "Organization_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_environment" ADD CONSTRAINT "Project_environment_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_environment" ADD CONSTRAINT "Project_environment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_permission" ADD CONSTRAINT "User_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_permission" ADD CONSTRAINT "User_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_permission" ADD CONSTRAINT "User_permission_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
