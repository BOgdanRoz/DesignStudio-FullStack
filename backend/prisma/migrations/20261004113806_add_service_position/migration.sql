ALTER TABLE "Service" ADD COLUMN "position" INTEGER;

UPDATE "Service"
SET "position" = "id";

ALTER TABLE "Service"
ALTER COLUMN "position" SET NOT NULL;