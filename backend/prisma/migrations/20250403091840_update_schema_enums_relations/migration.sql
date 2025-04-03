/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - The `cat` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `speciality` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[representativeId]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('REPRESENTATIVE', 'MANAGER');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DEFAULT', 'A', 'A_PLUS');

-- CreateEnum
CREATE TYPE "SpecialityType" AS ENUM ('Balneo_Fizio', 'Cardiologie', 'Chirurgie', 'Dermatologie', 'Diabetologie', 'Endocrinologie', 'Gastroenterologie', 'Geriatrie', 'Ginecologie', 'Gp', 'Hematologie', 'Imunologie', 'Infectioase', 'Interne', 'Nefrologie', 'Neurochirurgie', 'Neurologie', 'Obstretica_Ginecologie', 'Oftalmologie', 'Oncologie', 'ORL', 'Ortopedie', 'Psihiatrie', 'Reumatologie', 'Urologie', 'Urgente', 'Recuperare', 'Medicina_Sportiva', 'Neonantologie', 'MF', 'Pediatrie', 'Pneumologie', 'Alergologie', 'UNKNOWN');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_listId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "representativeId" INTEGER;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ALTER COLUMN "dueDate" DROP NOT NULL,
DROP COLUMN "cat",
ADD COLUMN     "cat" "Category" NOT NULL DEFAULT 'DEFAULT',
DROP COLUMN "speciality",
ADD COLUMN     "speciality" "SpecialityType" NOT NULL DEFAULT 'UNKNOWN',
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "tel" DROP NOT NULL,
ALTER COLUMN "cnp" DROP NOT NULL,
ALTER COLUMN "workplace" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "cuim" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "schedule" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'REPRESENTATIVE';

-- CreateIndex
CREATE UNIQUE INDEX "List_representativeId_key" ON "List"("representativeId");

-- CreateIndex
CREATE UNIQUE INDEX "Space_name_key" ON "Space"("name");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
