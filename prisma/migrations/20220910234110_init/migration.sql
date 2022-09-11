-- CreateTable
CREATE TABLE "Person" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "location" TEXT,
    "birthdate" DATETIME,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_user_name_key" ON "Person"("user_name");
