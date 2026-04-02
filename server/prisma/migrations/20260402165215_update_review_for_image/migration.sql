-- DropIndex
DROP INDEX `Product_createdBy_fkey` ON `product`;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `image` VARCHAR(191) NULL;
