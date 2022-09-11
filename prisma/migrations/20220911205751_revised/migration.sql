/*
  Warnings:

  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "location" TEXT,
    "birthdate" DATETIME,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Person" ("birthdate", "id", "location", "name", "password", "surname", "user_name") SELECT "birthdate", "id", "location", "name", "password", "surname", "user_name" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_user_name_key" ON "Person"("user_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
