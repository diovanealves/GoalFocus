/*
  Warnings:

  - You are about to drop the column `createdAt` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `currentValue` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `finalValue` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `goalId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_goalId_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "createdAt",
DROP COLUMN "currentValue",
DROP COLUMN "finalValue",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_value" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "final_value" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "goalId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "goal_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
