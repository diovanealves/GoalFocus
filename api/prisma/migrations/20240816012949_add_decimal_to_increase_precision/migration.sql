/*
  Warnings:

  - You are about to alter the column `current_value` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `final_value` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `value` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "current_value" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "final_value" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);
