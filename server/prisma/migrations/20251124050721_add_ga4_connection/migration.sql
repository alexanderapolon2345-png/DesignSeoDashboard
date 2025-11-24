-- AlterTable
ALTER TABLE `clients` ADD COLUMN `ga4AccessToken` TEXT NULL,
    ADD COLUMN `ga4AccountEmail` VARCHAR(191) NULL,
    ADD COLUMN `ga4ConnectedAt` DATETIME(3) NULL,
    ADD COLUMN `ga4PropertyId` VARCHAR(191) NULL,
    ADD COLUMN `ga4RefreshToken` TEXT NULL;
